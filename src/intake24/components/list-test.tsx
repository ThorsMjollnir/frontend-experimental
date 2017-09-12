import * as React from "react";

class ListProps {
    items: string[];

    newItem: () => void;

    constructor(items: string[]) {
        this.items = items;
    }
}

export class ListTest extends React.Component<ListProps, {}> {

    render() {
        return <div>
            <ul>
                {
                    this.props.items.map(s => <li onClick={this.props.newItem}>{s}</li>)
                }
            </ul>
        </div>
    }
}
