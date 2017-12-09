import * as React from "react";
import * as ReactDOM from "react-dom";
import {Store, createStore, combineReducers} from "redux";

import {Toolbox} from "intake24-redux-client";

let toolbox = new Toolbox("intake24.toolbox");

let store = createStore(
    combineReducers({
        "intake24.toolbox": toolbox.getReducer()
    }),
    window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]()
);

let selector = toolbox.init(store);

ReactDOM.render(
    <div/>, document.getElementById("root")
);