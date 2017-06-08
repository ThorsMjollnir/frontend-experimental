import * as React from "react";
import * as ReactDOM from "react-dom";
import {Button, Dropdown} from "react-bootstrap";

export class LocaleSelector extends React.Component<{}, {}> {

    public render() {
        return <div>
            <span>Locale: </span>
            <select></select>
        </div>;
    }
}

export class FoodFinder extends React.Component<{}, {}> {

    public render() {
        return <LocaleSelector></LocaleSelector>
    }

}
