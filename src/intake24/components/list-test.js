import * as React from "react";
export class ListContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            items: []
        };
    }
    addItem() {
    }
    componentWillMount() {
        this.subscription = this.props.items.subscribe((items) => this.setState({ items: items }));
    }
    listItems() {
        return this.state.items.map((item) => React.createElement(ListItem, { item: item, newItem: this.addItem.bind(this) }));
    }
    render() {
        return React.createElement("div", null,
            React.createElement("ul", null, this.listItems()));
    }
}
export class ListItem extends React.Component {
    render() {
        return React.createElement("li", { onClick: this.props.newItem }, this.props.item);
    }
}
//# sourceMappingURL=list-test.js.map