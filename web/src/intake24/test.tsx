import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose, Dispatch} from "redux";
import {Provider, connect} from "react-redux";
import {Router, Route} from "react-router";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

import {Toolbox} from "intake24-redux-client";
import {Component} from "react";

let key ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleUp3Y205MmFXUmxja2xFSWpvaVpXMWhhV3dpTENKd2NtOTJhV1JsY2t0bGVTSTZJbUZ3YVRGQVpHa3RkR1Z6ZEM1amIyMGlmUT09IiwiaXNzIjoiaW50YWtlMjQiLCJleHAiOjE2NzA3NzE4MzYsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTEzMDkxODM2LCJ1c2VySWQiOjE4MTMxLCJqdGkiOiJjMTc3ODliZTE4ZmJiMjlhNWVjYWVjODk3MjViMWVjNjdkNzdkZTIzYzM4YWM2YWNkMDI1ZTJjMjFjODQ0OWE0MWRiODM2MDI3YzNkNjYyNjA5MDU2ZTY1NDdkYTQ3MjlkYzJlMmVmNWUxODMwMWEzYzNhYjExMzYxM2ZlYWU1MjU4ZWFiYjNlZjlhNWRjMzZiZjA2YTQ4YzM5MzA5YjgwYWE5YzkzODdiYjdiNGE1YjczODZiYzEzYWY5ZjkyMDNhNDA4ZWNhMjZiM2Q1N2E1MzYzMjYxODNkMjIwMmY3NTA1NmYwYzQ2M2VmZWJlNTMwMmU5ZDRkNmM1MTZhMGE4In0._hxZfuK-pQHxJR8CTEdqygEa9sW27cVynaULa3Gsu1I"

let toolbox = new Toolbox("intake_toolbox");

let history = createHistory();

console.log(history)

let composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

let store = createStore(
    combineReducers({
        router: routerReducer,
        intake_toolbox: toolbox.getReducer()
    }),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)))
);

let selector = toolbox.init(store);


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
                this.props.dispatch({ type: "KOTAKBAS!"});
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
return {}})(App);


ReactDOM.render(
    <Provider store={store}>
        <AppConnected/>
    </Provider>,
    document.getElementById('root')
);

