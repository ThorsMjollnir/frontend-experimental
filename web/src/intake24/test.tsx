import * as LocalConfig from "../local_config";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose, Dispatch} from "redux";
import {Provider, connect} from "react-redux";
import {Router, Route} from "react-router";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

import {Client, FoodSearch, ClientReducer, FoodSearchReducer, LookupResult, FoodNutrientsCalculator, FNCReducer} from "intake24-redux-client";
import {Component} from "react";


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

intakeClient.setApiBaseUrl(LocalConfig.apiBaseUrl);
intakeClient.setRefreshToken(LocalConfig.refreshToken);


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

    onFoodSelected(code) {
        this.props.foodSearch.select(code);
    }

    renderResults() {
        if (this.props.result.foods.length != 0)
            return <ul>
                {this.props.result.foods.map(f => <li><span onClick={this.onFoodSelected.bind(this, f.code)}>{f.localDescription}</span></li>)}
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
        this.props.client.signin(this.state.email, this.state.password);
    }

    onEmailChanged(event) {
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

