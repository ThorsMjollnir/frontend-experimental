import * as React from "react";
import * as ReactDOM from "react-dom";
import {Button, Dropdown} from "react-bootstrap";
import {LocalesService} from "../api/locales";
import { Observable, IDisposable} from "rx";

export interface LocaleSelectorProps {
    service: LocalesService;
}

export interface LocaleSelectorState {
    locales: string[],
    selectedLocale?: string
}

export class LocaleSelector extends React.Component<LocaleSelectorProps, LocaleSelectorState> {

    private localeList: Observable<string[]>;
    private subscription: IDisposable;

    constructor(props: LocaleSelectorProps) {
        super(props);

        this.state = {
            locales: [],
            selectedLocale: null
        }

        console.log("Kotak?");

        this.localeList = props.service.listLocales();

        var outerThis = this;

        this.subscription = this.localeList.subscribe(function (v) {
            outerThis.setState({locales: v, selectedLocale: v[0]});
        });
    }

    public componentWillMount() {
        this.subscription.dispose();
    }

    public render() {
        return <div>
            <span>Locale: </span>
            <select>{this.state.locales.map( s => <option>s</option>)}</select>
        </div>;
    }
}

export interface FoodFinderProps {
    localesService: LocalesService
}

export class FoodFinder extends React.Component<FoodFinderProps, {}> {

    public render() {
        return <LocaleSelector service={this.props.localesService}></LocaleSelector>
    }

}
