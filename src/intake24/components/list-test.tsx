import * as React from "react";
import {Observable, Subscription} from "rxjs"
import {Subject} from "rxjs/Subject";
import {AddItem, DeleteItem} from "../test";


interface ListContainerProps {
    items: Observable<string[]>;
    newItem: Subject<AddItem>;
    deleteItem: Subject<DeleteItem>;
}

interface ListContainerState {
    items: string[];
}

export class ListContainer extends React.Component<ListContainerProps, ListContainerState> {

    subscription: Subscription;

    constructor(props: ListContainerProps) {
        super();

        this.state = {
            items: []
        };
    }

    addItem() {

    }

    componentWillMount() {
        this.subscription = this.props.items.subscribe((items: [string]) => this.setState({items: items}));
    }

    listItems() {
        return this.state.items.map((item: string) => <ListItem item={item}
                                                                newItem={this.addItem.bind(this)}></ListItem>
        );
    }

    render() {
        return <div>
            <ul>
                {this.listItems()}
            </ul>
        </div>
    }
}

interface ListItemProps {
    item: string;
    newItem: (e: any) => void;
}

export class ListItem extends React.Component<ListItemProps, {}> {

    render() {
        return <li onClick={this.props.newItem}>{this.props.item}</li>;
    }
}
