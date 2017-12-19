import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory';
import { Client, FoodSearch, ClientReducer, FoodSearchReducer } from "intake24-redux-client";
import { Component } from "react";
let key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleUp3Y205MmFXUmxja2xFSWpvaVpXMWhhV3dpTENKd2NtOTJhV1JsY2t0bGVTSTZJbUZ3YVRGQVpHa3RkR1Z6ZEM1amIyMGlmUT09IiwiaXNzIjoiaW50YWtlMjQiLCJleHAiOjE2NzA3NzE4MzYsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTEzMDkxODM2LCJ1c2VySWQiOjE4MTMxLCJqdGkiOiJjMTc3ODliZTE4ZmJiMjlhNWVjYWVjODk3MjViMWVjNjdkNzdkZTIzYzM4YWM2YWNkMDI1ZTJjMjFjODQ0OWE0MWRiODM2MDI3YzNkNjYyNjA5MDU2ZTY1NDdkYTQ3MjlkYzJlMmVmNWUxODMwMWEzYzNhYjExMzYxM2ZlYWU1MjU4ZWFiYjNlZjlhNWRjMzZiZjA2YTQ4YzM5MzA5YjgwYWE5YzkzODdiYjdiNGE1YjczODZiYzEzYWY5ZjkyMDNhNDA4ZWNhMjZiM2Q1N2E1MzYzMjYxODNkMjIwMmY3NTA1NmYwYzQ2M2VmZWJlNTMwMmU5ZDRkNmM1MTZhMGE4In0._hxZfuK-pQHxJR8CTEdqygEa9sW27cVynaULa3Gsu1I";
let history = createHistory();
console.log(history);
let composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
let store = createStore(combineReducers({
    router: routerReducer,
    intake24: combineReducers({
        "client": ClientReducer.create(),
        "foodSearch": FoodSearchReducer.create()
    })
}), composeEnhancers(applyMiddleware(routerMiddleware(history))));
let intakeClient = new Client("qwe", ["intake24", "client"]);
intakeClient.init("http://localhost:9001");
intakeClient.setRefreshToken(key);
let foodSearch = new FoodSearch(store, intakeClient, ["intake24", "foodSearch"]);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: "", timeoutId: null };
    }
    searchTextChanged(event) {
        let text = event.target.value;
        this.setState((prevState, props) => {
            if (prevState.timeoutId != null)
                clearTimeout(prevState.timeoutId);
            let newTimeoutId = text.length == 0 ? null : setTimeout(() => {
                this.props.foodSearch.search(text);
            }, 500);
            return {
                searchText: text,
                timeoutId: newTimeoutId
            };
        });
    }
    renderResults() {
        if (this.props.result.foods.length != 0)
            return React.createElement("ul", null, this.props.result.foods.map(f => React.createElement("li", null, f.localDescription)));
        else
            return React.createElement("p", null, "No results.");
    }
    render() {
        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("input", { type: "text", value: this.state.searchText, onChange: this.searchTextChanged.bind(this) })),
            React.createElement("div", null, this.renderResults()));
    }
}
export const AppConnected = connect(state => {
    return {
        searchPending: state.intake24.foodSearch.searchPending,
        result: state.intake24.foodSearch.result
    };
})(App);
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }
    onSigninClicked() {
        console.log(this.state);
        this.props.client.signin(this.state.email, this.state.password);
    }
    onEmailChanged(event) {
        console.log(event.target.value);
        this.setState({ email: event.target.value });
    }
    onPasswordChanged(event) {
        this.setState({ password: event.target.value });
    }
    render() {
        return React.createElement("div", null,
            "E-mail: ",
            React.createElement("input", { type: "text", value: this.state.email, onChange: this.onEmailChanged.bind(this) }),
            "Password: ",
            React.createElement("input", { type: "text", value: this.state.password, onChange: this.onPasswordChanged.bind(this) }),
            React.createElement("input", { disabled: this.props.requestPending, type: "button", value: "Sign in", onClick: this.onSigninClicked.bind(this) }));
    }
}
export const LoginFormConnected = connect(state => {
    return {
        requestPending: state.intake24.client.signinRequestPending
    };
})(LoginForm);
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement("div", null,
        React.createElement(LoginFormConnected, { client: intakeClient }),
        React.createElement(AppConnected, { foodSearch: foodSearch }))), document.getElementById('root'));
//# sourceMappingURL=test.js.map