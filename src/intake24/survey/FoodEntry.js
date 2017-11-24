export class FoodLink {
    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
    }
}
export class AbstractFood {
    constructor(link, flags, customData) {
        this.link = link;
        this.flags = flags;
        this.customData = customData;
    }
}
export class RawFood extends AbstractFood {
    getDescription() {
        return this.description;
    }
}
export class EncodedFood extends AbstractFood {
    getDescription() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=FoodEntry.js.map