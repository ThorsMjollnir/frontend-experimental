import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose, Dispatch} from "redux";
import {Provider, connect} from "react-redux";
import {Router, Route} from "react-router";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

import {Toolbox} from "intake24-redux-client";
import {Component} from "react";

let key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleUp3Y205MmFXUmxja2xFSWpvaVpXMWhhV3dpTENKd2NtOTJhV1JsY2t0bGVTSTZJbUZ3YVRGQVpHa3RkR1Z6ZEM1amIyMGlmUT09IiwiaXNzIjoiaW50YWtlMjQiLCJleHAiOjE2NzA3NzE4MzYsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTEzMDkxODM2LCJ1c2VySWQiOjE4MTMxLCJqdGkiOiJjMTc3ODliZTE4ZmJiMjlhNWVjYWVjODk3MjViMWVjNjdkNzdkZTIzYzM4YWM2YWNkMDI1ZTJjMjFjODQ0OWE0MWRiODM2MDI3YzNkNjYyNjA5MDU2ZTY1NDdkYTQ3MjlkYzJlMmVmNWUxODMwMWEzYzNhYjExMzYxM2ZlYWU1MjU4ZWFiYjNlZjlhNWRjMzZiZjA2YTQ4YzM5MzA5YjgwYWE5YzkzODdiYjdiNGE1YjczODZiYzEzYWY5ZjkyMDNhNDA4ZWNhMjZiM2Q1N2E1MzYzMjYxODNkMjIwMmY3NTA1NmYwYzQ2M2VmZWJlNTMwMmU5ZDRkNmM1MTZhMGE4In0._hxZfuK-pQHxJR8CTEdqygEa9sW27cVynaULa3Gsu1I"

let history = createHistory();

console.log(history)

let composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

let store = createStore(
    combineReducers({
        router: routerReducer,
        intake24: Toolbox.createReducer()
    }),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)))
);

Toolbox.init("http://localhost:9001", store, "intake24");

export interface AppProps {
    dispatch: Dispatch<{}>;
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
                this.props.dispatch({type: "KOTAKBAS!"});
            }, 500);

            return {
                searchText: text,
                timeoutId: newTimeoutId
            };
        });
    }

    render() {
        return <div>
            <input type="text" value={this.state.searchText} onChange={this.searchTextChanged.bind(this)}/>
        </div>
    }
}

export const AppConnected = connect(state => {
    return {}
})(App);


export interface LoginFormProps {
    email: string;
    password: string;
    signinClicked: boolean;
    authStore: any;
}

export interface LoginFormState {
    email: string;
    password: string;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {

    constructor(props) {
        super(props);

        this.state = {email: props.email, password: props.password};
    }

    onSigninClicked() {
        this.props.authStore.signin(this.state.email, this.state.password);
    }

    onEmailChanged(text) {
        this.setState( prevState => { return { email: text }; } )
    }

    onPasswordChanged(text) {
        this.setState( prevState => { return { password: text }; } )
    }

    render() {
        return <div>
            E-mail: <input type="text" value={this.state.email} onChange={ evt => this.onEmailChanged.bind(this)(evt.target.value)}/>
            Password: <input type="text" value={this.state.password} onChange={ evt => this.onPasswordChanged.bind(this)(evt.target.value)}/>
            <input type="button" value="Sign in" onClick={this.onSigninClicked.bind(this)}/>
        </div>
    }
}

export const LoginFormConnected = connect( state => {

    return {
        email: state.intake24.auth.credentials.email,
        password: state.intake24.auth.credentials.password,
        signinClicked: state.intake24.auth.signinClicked
    }
})(LoginForm);


ReactDOM.render(
    <Provider store={store}>
        <LoginFormConnected authStore={Toolbox.authStore}/>

    </Provider>,
    document.getElementById('root')
);

