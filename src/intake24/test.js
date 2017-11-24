import * as React from "react";
import * as ReactDOM from "react-dom";
import { ListContainer } from "./components/list-test";
import { Observable, Subject } from "rxjs";
export class AddItem {
    constructor(name) {
        this.name = name;
    }
}
export class DeleteItem {
    constructor(index) {
        this.index = index;
    }
}
class T {
    test(a) {
        console.log(a);
    }
    test(b) {
        console.log(b);
    }
}
let addItemStream = new Subject();
let deleteItemStream = new Subject();
let actionStream = addItemStream.merge(deleteItemStream);
let currentItems = Observable.of(["пиьска"]);
let o = new AddItem("123");
setInterval(() => addItemStream.next(new AddItem(Math.random().toString())), 1000);
setInterval(() => deleteItemStream.next(new DeleteItem(Math.random())), 1000);
ReactDOM.render(React.createElement(ListContainer, { items: currentItems, newItem: addItemStream, deleteItem: deleteItemStream }), document.getElementById("root"));
//# sourceMappingURL=test.js.map