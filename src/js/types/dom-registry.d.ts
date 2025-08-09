export type DomRegistry = {
    configView: ConfigView;
    manuView: ManuView;
    resultView: ResultView;
    titleRef: HTMLElement;
};

export type ConfigView = {
    startManu: HTMLButtonElement;
    rootElement: HTMLElement;
    logihubInput: {
        input: HTMLTextAreaElement;
        submitButton: HTMLButtonElement;
    };
    manualInput: {
        itemName: HTMLInputElement;
        itemNameDatalist: HTMLDataListElement;
        itemPriority: HTMLSelectElement;
        itemAmount: HTMLInputElement;
        submitButton: HTMLButtonElement;
    };
    dataView: {
        rootElement: HTMLElement;
        itemCardTemplate: HTMLTemplateElement;
    };
};

export type ManuView = {
    stopManu: HTMLButtonElement;
    rootElement: HTMLElement;
    statisticLabels: {
        crateCrafted: HTMLElement;
        timeSpent: HTMLElement;
        itemToCraft: HTMLElement;
        costToCraft: HTMLElement;
        itemCardTemplate: HTMLTemplateElement;
    };
    controls: {
        lightArm: HTMLButtonElement;
        heavyArm: HTMLButtonElement;
        heavyShell: HTMLButtonElement;
        utilities: HTMLButtonElement;
        medical: HTMLButtonElement;
        uniform: HTMLButtonElement;
        submitButton: HTMLButtonElement;
    };
};

export type ResultView = {
    rootElement: HTMLElement;
    timeSpent: HTMLElement;
    crateCrafted: HTMLElement;
    itemCrafted: HTMLElement;
    returnButton: HTMLButtonElement;
    itemCardTemplate: HTMLTemplateElement;
};
