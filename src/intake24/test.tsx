import * as React from "react";
import * as ReactDOM from "react-dom";

import {ListContainer} from "./components/list-test";
import {Observable, Subject} from "rxjs";


export class AddItem {
    name: string

    constructor(name: string) {
        this.name = name;
    }

}

export class DeleteItem {
    index: number

    constructor(index: number) {
        this.index = index;
    }
}

export type Action = AddItem | DeleteItem

class T {
    test(a: AddItem) {
        console.log(a);
    }

    test(b: DeleteItem) {
        console.log(b);
    }
}


let addItemStream = new Subject<AddItem>();

let deleteItemStream = new Subject<DeleteItem>();

let actionStream = addItemStream.merge(deleteItemStream);

let currentItems = Observable.of(["пиьска"]);

let o = new AddItem("123")

setInterval(() => addItemStream.next(new AddItem(Math.random().toString())), 1000);
setInterval(() => deleteItemStream.next(new DeleteItem(Math.random())), 1000);

ReactDOM.render(
    <ListContainer items={currentItems} newItem={addItemStream}
                   deleteItem={deleteItemStream}/>, document.getElementById("root")
);