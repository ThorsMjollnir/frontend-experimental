import * as React from "react";
import {connect} from "react-redux";
import {PortionSizeMethod, MethodSelector} from "intake24-redux-client";

export interface SelectPortionSizeMethodPromptProps {
    availableMethods: PortionSizeMethod[];

    selectCallback: (index: number) => void;
}

export interface SelectPortionSizeMethodItemProps {
    description: string,
    imageUrl: string,
    selectCallback: () => void
}

export class PortionSizeMethodItem extends React.Component<SelectPortionSizeMethodItemProps, {}> {
    render() {
        return <div onClick={this.props.selectCallback}><img src={this.props.imageUrl}/></div>
    }
}

export class SelectPortionSizeMethodPrompt extends React.Component<SelectPortionSizeMethodPromptProps, {}> {

    render() {

        let items = this.props.availableMethods.map((psm, index) => <PortionSizeMethodItem description={psm.description}
                                                                                           imageUrl={psm.imageUrl}
                                                                                           selectCallback={() => this.props.selectCallback(index)}/>);

        return <div>
            {items}
        </div>
    }
}

export const SelectPortionSizeMethodPromptContainer = connect((s: any, ownProps: { methodSelector: MethodSelector }) => {
    let methodSelector = ownProps.methodSelector;
    let state = methodSelector.getState();

    return {
        availableMethods: state.availableMethods,
        selectCallback: methodSelector.selectMethod.bind(methodSelector)
    }
})(SelectPortionSizeMethodPrompt);