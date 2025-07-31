type DataStore = {
    sortedItems: Item[][];
    dataViewRef: HTMLElement;
    manuViewRef: {
        crateCrafted: HTMLElement;
        timeSpent: HTMLElement;
        itemToCraft: HTMLElement;
        costToCraft: HTMLElement;
        intervalRef: number;
    };
    templateReference: TemplateRef;
};

type TemplateRef = {
    itemCard: HTMLElement;
};

declare global {
    var dataStore: DataStore;
}

export {};
