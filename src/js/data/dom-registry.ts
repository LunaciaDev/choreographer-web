import type {
    ConfigView,
    DomRegistry,
    ManuView,
    ResultView,
} from '../types/dom-registry';

let domRegistry: DomRegistry;

function getElementReference(id: string): HTMLElement {
    const node = document.getElementById(id);

    if (node === null) {
        throw new Error(`Cannot find element ${id}`);
    }

    return node;
}

/**
 * Initialize the DOM Registry.
 *
 * We hold all reference to all elements needed for the app to manipulate
 * so it doesnt have to fetch from DOM API and check null every time.
 *
 * It is brittle though, as getter can manipulate the DOM Registry...
 *
 * [TODO]: freeze the registry post-init.
 */
export function initDomRegistry() {
    domRegistry = {
        titleRef: getElementReference('title'),
        configView: {
            startManu: getElementReference(
                'start-manu-button'
            ) as HTMLButtonElement,
            rootElement: getElementReference('config-view'),
            logihubInput: {
                input: getElementReference(
                    'logihub-import-paste'
                ) as HTMLTextAreaElement,
                submitButton: getElementReference(
                    'submit-logihub-import'
                ) as HTMLButtonElement,
            },
            manualInput: {
                itemName: getElementReference('item-name') as HTMLInputElement,
                itemNameDatalist: getElementReference(
                    'item-names-list'
                ) as HTMLDataListElement,
                itemPriority: getElementReference(
                    'priority'
                ) as HTMLSelectElement,
                itemAmount: getElementReference('amount') as HTMLInputElement,
                submitButton: getElementReference(
                    'submit-item-button'
                ) as HTMLButtonElement,
            },
            dataView: {
                rootElement: getElementReference('data-view'),
                itemCardTemplate: getElementReference(
                    'item-card-template'
                ) as HTMLTemplateElement,
            },
        },
        manuView: {
            stopManu: getElementReference(
                'stop-manu-button'
            ) as HTMLButtonElement,
            rootElement: getElementReference('manu-view'),
            statisticLabels: {
                crateCrafted: getElementReference('crate-crafted'),
                timeSpent: getElementReference('time-spent'),
                itemToCraft: getElementReference('item-to-craft'),
                costToCraft: getElementReference('cost-to-craft'),
                itemCardTemplate: getElementReference(
                    'manu-item-line-template'
                ) as HTMLTemplateElement,
            },
            controls: {
                lightArm: getElementReference(
                    'rq-lightarm'
                ) as HTMLButtonElement,
                heavyArm: getElementReference(
                    'rq-heavyarm'
                ) as HTMLButtonElement,
                heavyShell: getElementReference(
                    'rq-heavyshell'
                ) as HTMLButtonElement,
                utilities: getElementReference(
                    'rq-utilities'
                ) as HTMLButtonElement,
                medical: getElementReference('rq-medical') as HTMLButtonElement,
                uniform: getElementReference('rq-uniform') as HTMLButtonElement,
                submitButton: getElementReference(
                    'rq-crafted'
                ) as HTMLButtonElement,
            },
        },
        resultView: {
            rootElement: getElementReference('result-view'),
            timeSpent: getElementReference('result-time'),
            crateCrafted: getElementReference('result-crate'),
            itemCrafted: getElementReference('result-item-crafted'),
            returnButton: getElementReference(
                'return-button'
            ) as HTMLButtonElement,
            itemCardTemplate: getElementReference(
                'result-item-card'
            ) as HTMLTemplateElement,
        },
    };
}

/**
 * Get the Config Screen portion of DOM Registry
 *
 * @returns Reference to the Config portion of DOM Registry
 */
export function DomRegistry_getConfigView(): ConfigView {
    return domRegistry.configView;
}

/**
 * Get the Manu Screen portion of DOM Registry
 *
 * @returns Reference to the Manu portion of DOM Registry
 */
export function DomRegistry_getManuView(): ManuView {
    return domRegistry.manuView;
}

/**
 * Get the Result Screen portion of DOM Registry
 *
 * @returns Reference to the Result portion of DOM Registry
 */
export function DomRegistry_getResultView(): ResultView {
    return domRegistry.resultView;
}

/**
 * Get the entirety of the DOM Registry
 *
 * @returns Reference to the DOM Registry
 */
export function DomRegistry_getRegistry(): DomRegistry {
    return domRegistry;
}
