import * as React from "react";
import * as ReactDOM from "react-dom";

import {ListTest} from "./components/list-test";

var items = ["a", "b", "c"];

ReactDOM.render(
    <ListTest items={items} newItem={ (e:any) => items.push("new!")}/>,
    document.getElementById("root")
);