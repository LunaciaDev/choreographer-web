type DataStore = {
    columnReference: ColumnRef[];
    templateReference: TemplateRef;
};

type TemplateRef = {
    itemCard: HTMLElement;
    itemColumn: HTMLElement;
};

type ColumnRef = {
    reference: HTMLElement;
    items: Item[];
};

declare global {
    var dataStore: DataStore;
}

export {};
