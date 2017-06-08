import * as React from "react";
import * as ReactDOM from "react-dom";
import {FoodFinder} from "./intake24/components/food-finder";
import {LocalesService} from "./intake24/api/locales";

let localesService = new LocalesService();

ReactDOM.render(<FoodFinder localesService={localesService} ></FoodFinder>, document.getElementById("root"));