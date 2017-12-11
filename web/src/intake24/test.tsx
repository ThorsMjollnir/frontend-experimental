import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Router, Route} from "react-router";
import {ConnectedRouter, routerReducer, routerMiddleware, push} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

import {Toolbox} from "intake24-redux-client";
import {Component} from "react";

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

export class App extends Component<{}, {}> {
    render() {
        return <div><p>Kotakbas</p></div>
    }
}

export class Foo extends Component<{}, {}> {
    render() {
        return <div><p>Foo</p></div>
    }
}

export class Bar extends Component<{}, {}> {
    render() {
        return <div><p>Bar</p></div>
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}>
                <Route path="foo" component={Foo}/>
                <Route path="bar" component={Bar}/>
            </Route>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
