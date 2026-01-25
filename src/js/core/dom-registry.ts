export type ConfigManualInput = {
    item_name: HTMLInputElement;
    item_datalist: HTMLDataListElement;
    item_priority: HTMLSelectElement;
    item_amount: HTMLInputElement;
    submit_button: HTMLButtonElement;
};

export type ConfigLogihubInput = {
    input: HTMLTextAreaElement;
    submit_button: HTMLButtonElement;
};

export type ConfigDataView = {
    root_element: HTMLElement;
    item_card_template: HTMLTemplateElement;
};

export type ConfigRegistry = {
    start_manu: HTMLButtonElement;
    root_element: HTMLElement;
    logihub_input: ConfigLogihubInput;
    manual_input: ConfigManualInput;
    data_view: ConfigDataView;
};

export type ManuStatLabel = {
    crate_crafted: HTMLElement;
    time_spent: HTMLElement;
    item_to_craft: HTMLElement;
    cost_to_craft: HTMLElement;
    item_card_template: HTMLTemplateElement;
};

export type ManuControl = {
    light_arm: HTMLButtonElement;
    heavy_arm: HTMLButtonElement;
    heavy_shell: HTMLButtonElement;
    utilities: HTMLButtonElement;
    medical: HTMLButtonElement;
    uniform: HTMLButtonElement;
    submit_button: HTMLButtonElement;
};

export type ManuRegistry = {
    stop_manu_button: HTMLButtonElement;
    root_element: HTMLElement;
    stat_label: ManuStatLabel;
    control: ManuControl;
};

export type ResultRegistry = {
    root_element: HTMLElement;
    time_spent: HTMLElement;
    crate_crafted: HTMLElement;
    item_crafted: HTMLElement;
    return_button: HTMLButtonElement;
    item_card_template: HTMLTemplateElement;
};

export type StatRegistry = {
    root_element: HTMLElement;
    crate_count: HTMLElement;
    time_spent: HTMLElement;
    time_to_hundred_crate: HTMLElement;
    bmat_used: HTMLElement;
    emat_used: HTMLElement;
    hemat_used: HTMLElement;
    rmat_used: HTMLElement;
};

function get_element_reference(id: string): HTMLElement {
    const node = document.getElementById(id);

    if (node === null) {
        throw new Error(`Cannot find element ${id}`);
    }

    return node;
}

let config_registry: ConfigRegistry;
let manu_registry: ManuRegistry;
let result_registry: ResultRegistry;
let stat_registry: StatRegistry;
let title: HTMLElement;
let theme_button: HTMLButtonElement;

export namespace DomRegistry {
    export function init() {
        title = get_element_reference('title');
        theme_button = get_element_reference(
            'theme-switch'
        ) as HTMLButtonElement;
        config_registry = {
            start_manu: get_element_reference(
                'start-manu-button'
            ) as HTMLButtonElement,
            root_element: get_element_reference('config-view'),
            logihub_input: {
                input: get_element_reference(
                    'logihub-import-paste'
                ) as HTMLTextAreaElement,
                submit_button: get_element_reference(
                    'submit-logihub-import'
                ) as HTMLButtonElement,
            },
            manual_input: {
                item_name: get_element_reference(
                    'item-name'
                ) as HTMLInputElement,
                item_datalist: get_element_reference(
                    'item-names-list'
                ) as HTMLDataListElement,
                item_priority: get_element_reference(
                    'priority'
                ) as HTMLSelectElement,
                item_amount: get_element_reference(
                    'amount'
                ) as HTMLInputElement,
                submit_button: get_element_reference(
                    'submit-item-button'
                ) as HTMLButtonElement,
            },
            data_view: {
                root_element: get_element_reference('data-view'),
                item_card_template: get_element_reference(
                    'item-card-template'
                ) as HTMLTemplateElement,
            },
        };
        manu_registry = {
            stop_manu_button: get_element_reference(
                'stop-manu-button'
            ) as HTMLButtonElement,
            root_element: get_element_reference('manu-view'),
            stat_label: {
                crate_crafted: get_element_reference('crate-crafted'),
                time_spent: get_element_reference('time-spent'),
                item_to_craft: get_element_reference('item-to-craft'),
                cost_to_craft: get_element_reference('cost-to-craft'),
                item_card_template: get_element_reference(
                    'manu-item-line-template'
                ) as HTMLTemplateElement,
            },
            control: {
                light_arm: get_element_reference(
                    'rq-lightarm'
                ) as HTMLButtonElement,
                heavy_arm: get_element_reference(
                    'rq-heavyarm'
                ) as HTMLButtonElement,
                heavy_shell: get_element_reference(
                    'rq-heavyshell'
                ) as HTMLButtonElement,
                utilities: get_element_reference(
                    'rq-utilities'
                ) as HTMLButtonElement,
                medical: get_element_reference(
                    'rq-medical'
                ) as HTMLButtonElement,
                uniform: get_element_reference(
                    'rq-uniform'
                ) as HTMLButtonElement,
                submit_button: get_element_reference(
                    'rq-crafted'
                ) as HTMLButtonElement,
            },
        };
        result_registry = {
            root_element: get_element_reference('result-view'),
            time_spent: get_element_reference('result-time'),
            crate_crafted: get_element_reference('result-crate'),
            item_crafted: get_element_reference('result-item-crafted'),
            return_button: get_element_reference(
                'return-button'
            ) as HTMLButtonElement,
            item_card_template: get_element_reference(
                'result-item-card'
            ) as HTMLTemplateElement,
        };
        stat_registry = {
            root_element: get_element_reference('stat-view'),
            crate_count: get_element_reference('stat-crate-count'),
            time_spent: get_element_reference('stat-time-spent'),
            time_to_hundred_crate: get_element_reference(
                'stat-time-hundred-crate'
            ),
            bmat_used: get_element_reference('stat-bmat-used'),
            emat_used: get_element_reference('stat-emat-used'),
            hemat_used: get_element_reference('stat-hemat-used'),
            rmat_used: get_element_reference('stat-rmat-used'),
        };
    }

    export function get_title(): HTMLElement {
        return title;
    }

    export function get_theme_button(): HTMLButtonElement {
        return theme_button;
    }

    export function get_config_registry(): ConfigRegistry {
        return config_registry;
    }

    export function get_manu_registry(): ManuRegistry {
        return manu_registry;
    }

    export function get_result_registry(): ResultRegistry {
        return result_registry;
    }

    export function get_stat_registry(): StatRegistry {
        return stat_registry;
    }
}
