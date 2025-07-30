type DataStore = {
    sortedItems: Item[][];
    dataViewRef: HTMLElement;
    templateReference: TemplateRef;
};

type TemplateRef = {
    itemCard: HTMLElement;
};

declare global {
    var dataStore: DataStore;
}

export {};
