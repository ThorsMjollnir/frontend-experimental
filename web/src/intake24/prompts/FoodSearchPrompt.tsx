import * as React from "react";
import {Provider, connect} from "react-redux";
import {FoodSearch, LookupResult} from "intake24-redux-client";

export interface FoodSearchPromptProps {
    requestPending: boolean;
    searchResult: LookupResult;

    searchCallback: (query: string) => void;
    selectCallback: (foodCode: string) => void;
}

export interface FoodSearchPromptState {
    searchText: string;
    timeoutId?: number;
}

export class FoodSearchPrompt extends React.Component<FoodSearchPromptProps, FoodSearchPromptState> {

    constructor(props) {
        super(props);
        this.state = {searchText: "", timeoutId: null};
    }

    searchTextChanged(event) {

        let text = event.target.value;

        this.setState((prevState, props) => {
            if (prevState.timeoutId != null)
                clearTimeout(prevState.timeoutId);

            let newTimeoutId = text.length == 0 ? null : setTimeout(() => {
                this.props.searchCallback(text);
            }, 500);

            return {
                searchText: text,
                timeoutId: newTimeoutId
            };
        });
    }

    onFoodSelected(code) {
        this.props.selectCallback(code);
    }

    renderFoodList() {
        if (this.props.searchResult.foods.length != 0)
            return <ul>
                {this.props.searchResult.foods.map(f => <li><span
                    onClick={this.onFoodSelected.bind(this, f.code)}>{f.localDescription}</span></li>)}
            </ul>
        else
            return <p>No results.</p>
    }

    renderLoading() {
        return <div>Loading...</div>
    }

    render() {
        let content;

        if (this.props.requestPending)
            content = this.renderLoading();
        else
            content = this.renderFoodList();

        return <div>
            <div>
                <input type="text" value={this.state.searchText} onChange={this.searchTextChanged.bind(this)}/>
            </div>
            <div>
                {content}
            </div>
        </div>
    }
}

export const FoodSearchPromptContainer = connect((s: any, ownProps: { foodSearch: FoodSearch }) => {
    let foodSearch = ownProps.foodSearch;
    let state = foodSearch.getState();

    return {
        requestPending: state.requestPending,
        searchResult: state.searchResult,
        searchCallback: foodSearch.search.bind(foodSearch),
        selectCallback: foodSearch.select.bind(foodSearch)
    }
})(FoodSearchPrompt);