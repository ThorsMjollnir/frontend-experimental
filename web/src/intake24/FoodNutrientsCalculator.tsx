import * as React from "react";

import {FoodNutrientsCalculator as FNC, Client} from "intake24-redux-client";
import {Store} from "redux";
import {LoginForm, LoginFormConnected} from "./LoginForm";
import {FoodSearchPrompt, FoodSearchPromptContainer} from "./prompts/FoodSearchPrompt";
import {connect} from "react-redux";
import {SelectPortionSizeMethodPromptContainer} from "./prompts/SelectPortionSizeMethodPrompt";

export interface FoodNutrientsCalculatorProps {
    currentPromptType: string;
    intakeClient: Client;
    foodNutrientsCalculator: FNC;
}

export class FoodNutrientsCalculator extends React.Component<FoodNutrientsCalculatorProps, {}> {

    render() {
        let currentPrompt = null;

        switch (this.props.currentPromptType) {
            case "FoodSearchPrompt":
                currentPrompt = <FoodSearchPromptContainer foodSearch={this.props.foodNutrientsCalculator.foodSearch}/>
                break;
            case "SelectPortionSizeMethodPrompt":
                currentPrompt = <SelectPortionSizeMethodPromptContainer methodSelector={this.props.foodNutrientsCalculator.methodSelector}/>
                break;
            default:
                console.error("Unsupported prompt type: " + this.props.currentPromptType)
        }

        return <div>
            <LoginFormConnected client={this.props.intakeClient}/>
            {currentPrompt}
        </div>
    }
}

export interface FoodNutrientsCalculatorContainerProps {
    intakeClient: Client;
    foodNutrientsCalculator: FNC;
}

export const FoodNutrientsCalculatorContainer = connect((s: any, ownProps: FoodNutrientsCalculatorContainerProps) => {

    let fnc = ownProps.foodNutrientsCalculator;

    return {
        currentPromptType: fnc.getState().currentPrompt.type,
        intakeClient: ownProps.intakeClient,
        foodNutrientsCalculator: ownProps.foodNutrientsCalculator
    }
})(FoodNutrientsCalculator);
