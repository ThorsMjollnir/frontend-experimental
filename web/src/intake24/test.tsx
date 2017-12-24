import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose, Dispatch} from "redux";
import {Provider, connect} from "react-redux";
import {Router, Route} from "react-router";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

import {Client, FoodSearch, ClientReducer, FoodSearchReducer, LookupResult, FoodNutrientsCalculator, FNCReducer} from "intake24-redux-client";
import {Component} from "react";

let key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleUp3Y205MmFXUmxja2xFSWpvaVpXMWhhV3dpTENKd2NtOTJhV1JsY2t0bGVTSTZJbWwyWVc0dWNHOXNhV0ZyYjNaQWJtTnNMbUZqTG5WckluMD0iLCJpc3MiOiJpbnRha2UyNCIsImV4cCI6MTY3MTgxNzY5MSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE1MTQxMzc2OTEsInVzZXJJZCI6MTgxNjgsImp0aSI6ImUyZjZjNDAxZDI0OGUwZTI2NDNiNGNiZTc5ZjZlNjBkOTM5MWEwMThjZjc5ZmUyNDkwN2Q0YmZiOTliNDk1ZGUwYmYwMzc3NzkyZTA5Yjk5ZGMyYWVmNWNkZTMxZjY3N2QyNmQ2NmJkOWUyYTYyZTUyNDZiZWUxZmY4M2E2ODg2MmZhZTg0Njg4OTU4Y2UyNWZlMWRjOWVmZTNkYTQ5MGUyM2IyMmQ5NWNjYzA1YjAxZDdmZGE1MWQwNDQzNzU4NTQwMTg3NTkxYjUwMTYxM2FjNDFmOWExMWMwMDI3NTg4M2M2ZGJmMzNhZGNlNzkxMTkxYzc5NDdjZjg1MGRjMzEifQ.GnsTzFZrqtupkJa7W7EgMy0aBgqVgtmsLpWUiATkFRw"

let history = createHistory();

console.log(history)

let composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

let store = createStore(
    combineReducers({
        router: routerReducer,
        intake24: combineReducers({
                "client": ClientReducer.create(),
                "foodNutrientsCalculator": FNCReducer.create()
            }
        )
    }),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)))
);

let intakeClient = new Client(store, ["intake24", "client"]);

intakeClient.setApiBaseUrl("http://localhost:9001");
intakeClient.setRefreshToken(key);


let fnc = new FoodNutrientsCalculator(store, intakeClient, ["intake24", "foodNutrientsCalculator"]);

let foodSearch = fnc.foodSearch;

export interface AppProps {
    foodSearch: FoodSearch;
    result: LookupResult;
}

export interface AppState {
    searchText: string;
    timeoutId?: number;
}

class App extends Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {searchText: "", timeoutId: null};
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
            return <ul>
                {this.props.result.foods.map(f => <li>{f.localDescription}</li>)}
            </ul>
        else
            return <p>No results.</p>
    }

    render() {
        return <div>
            <div>
                <input type="text" value={this.state.searchText} onChange={this.searchTextChanged.bind(this)}/>
            </div>
            <div>
                {this.renderResults()}
            </div>
        </div>
    }
}

export const AppConnected = connect(s => {

    let state = foodSearch.getState();
    return {
        searchPending: state.searchPending,
        result: state.result
    }
})(App);


export interface LoginFormProps {
    requestPending: boolean;
    client: Client;
}

export interface LoginFormState {
    email: string;
    password: string;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {

    constructor(props) {
        super(props);

        this.state = {email: "", password: ""};
    }

    onSigninClicked() {

        console.log(this.state);

        this.props.client.signin(this.state.email, this.state.password);
    }

    onEmailChanged(event) {

        console.log(event.target.value);

        this.setState({email: event.target.value});

    }

    onPasswordChanged(event) {
        this.setState({password: event.target.value});
    }

    render() {

        return <div>
            E-mail: <input type="text" value={this.state.email}
                           onChange={this.onEmailChanged.bind(this)}/>
            Password: <input type="text" value={this.state.password}
                             onChange={this.onPasswordChanged.bind(this)}/>
            <input disabled={this.props.requestPending} type="button" value="Sign in"
                   onClick={this.onSigninClicked.bind(this)}/>
        </div>
    }
}

export const LoginFormConnected = connect(state => {

    return {
        requestPending: state.intake24.client.signinRequestPending
    }
})(LoginForm);


ReactDOM.render(
    <Provider store={store}>
        <div>
            <LoginFormConnected client={intakeClient}/>
            <AppConnected foodSearch={foodSearch}/>
        </div>
    </Provider>,
    document.getElementById('root')
);

