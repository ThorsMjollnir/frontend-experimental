import * as Collections from "typescript-collections"

export class FoodLink {

    readonly id: number;
    readonly parent?: number;

    constructor(id: number, parent?: number) {
        this.id = id;
        this.parent = parent;
    }


}

export abstract class AbstractFood {

    readonly link: FoodLink;
    readonly flags: Collections.Set<string>;
    readonly customData: object;

    abstract getDescription(): string

    constructor(link: FoodLink, flags: Collections.Set<string>, customData: object) {
        this.link = link;
        this.flags = flags;
        this.customData = customData;
    }
}

export class RawFood extends AbstractFood {

    readonly description: string;

    getDescription(): string {
        return this.description;
    }


    /*public static final String FLAG_DRINK = "drink";
    public static final String FLAG_DISABLE_SPLIT = "disable-split";
    public static final String KEY_LIMIT_LOOKUP_TO_CATEGORY = "limit-lookup-to-category";

    public final String description;*/
}


/*
public class FoodData {
    public String code;
    public String localDescription;
    public boolean readyMealOption;
    public boolean sameAsBeforeOption;
    public double caloriesPer100g;
    public List<PortionSizeMethod> portionSizeMethods;
    public List<AssociatedFood> associatedFoods;
    public List<String> brands;
    public List<String> categories;
 */

export interface FoodData {

}

export interface PortionSize {

}

export interface CompletedPortionSize {

}

export interface AssociatedFood {

}

export class EncodedFood extends AbstractFood {

    readonly data: FoodData;
    readonly portionSizeMethodIndex?: number;
    readonly portionSize?: PortionSize | CompletedPortionSize;
    readonly brand?: string;
    readonly searchTerm: string;
    readonly remainingPrompts: AssociatedFood[];

    getDescription(): string {
        throw new Error("Method not implemented.");
    }

}

export interface FoodEntryVisitor<T> {
    visitRaw(rawFood: RawFood): T
    visitEncoded(encodedFood: EncodedFood): T
}

export interface FoodEntry {
    acceptVisitor<T>(): T
}