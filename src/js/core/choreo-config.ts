import {
    DomRegistry_getConfigView,
    DomRegistry_getRegistry,
} from '../data/dom-registry';
import { itemData } from '../data/item-data';
import { getTemplateChilds } from '../helper';
import type { ConfigView } from '../types/dom-registry';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import { ItemType_getIterator } from '../types/item-type';
import {
    Priority_priorityToString,
    Priority_stringToPriority,
    type Priority,
} from '../types/priority';
import { Manu_start } from './manu';

let choreoData: Item[][];
let configRegistry: ConfigView;
let manualInputRegistry: {
    itemName: HTMLInputElement;
    itemNameDatalist: HTMLDataListElement;
    itemPriority: HTMLSelectElement;
    itemAmount: HTMLInputElement;
    submitButton: HTMLButtonElement;
};

/**
 * Initialize the component.
 *
 * Must be called on DOM initialization, otherwise calls might fail.
 */
export function ChoreoConfig_init() {
    choreoData = [];

    ItemType_getIterator().forEach(() => {
        choreoData.push([]);
    });

    configRegistry = DomRegistry_getConfigView();

    manualInputRegistry = configRegistry.manualInput;
    manualInputRegistry.submitButton.addEventListener(
        'click',
        sanitizeManualInput
    );

    // Populate item name input with possible options
    for (const item of itemData.values()) {
        const itemName = document.createElement('option');
        itemName.value = item.name;
        manualInputRegistry.itemNameDatalist.appendChild(itemName);
    }

    configRegistry.startManu.addEventListener('click', () => {
        configRegistry.startManu.className = 'hidden';
        configRegistry.rootElement.className = 'hidden';
        Manu_start(choreoData);
    });
}

/**
 * Change the current screen to Config Screen.
 */
export function ChoreoConfig_start() {
    configRegistry.rootElement.className = '';
    configRegistry.startManu.className = 'accent';
    DomRegistry_getRegistry().titleRef.innerText = 'Config';

    refreshDataView();
}

/**
 * As inputs are hinted, but not enforced, we need to double check
 * to make sure that everything is a-OK!
 *
 * - Name has to be one of the item's name.
 * - Priority has to be one of the possible value.
 * - Amount must be integer > 0.
 *
 * [TODO]: Create responses based on the sanitization result
 */
function sanitizeManualInput() {
    const name = manualInputRegistry.itemName.value;
    const rawPriority = manualInputRegistry.itemPriority.value;
    const rawAmount = manualInputRegistry.itemAmount.value;

    if (name === null || rawAmount === null) {
        // [TODO]: show something in the UI
        return;
    }

    const amount = parseInt(rawAmount);

    if (amount <= 0) {
        // [TODO]: show something in the UI
        return;
    }

    let itemID;

    for (const [id, item] of itemData) {
        if (item.name === name) {
            itemID = id;
            break;
        }
    }

    if (itemID === undefined) {
        // [TODO]: show something in the UI
        return;
    }

    const priority = Priority_stringToPriority(rawPriority);

    manualInputRegistry.itemName.value = '';
    manualInputRegistry.itemAmount.value = '';

    ChoreoConfig_addItem(itemID, priority, amount);
}

/**
 * Add an item to the to-manu list.
 *
 * If the item already exist in the list, overwrite it.
 *
 * @param id The item's internal ID
 * @param priority The item's priority
 * @param amount The amount to manu
 */
export function ChoreoConfig_addItem(
    id: string,
    priority: Priority,
    amount: number
) {
    const itemType = itemData.get(id)?.type;
    if (itemType === undefined) return;

    const dataRow = choreoData[itemType];
    let duplicated = false;

    for (const item of dataRow) {
        if (item.id === id) {
            item.priority = priority;
            item.amount = amount;
            duplicated = true;
            break;
        }
    }

    if (!duplicated) {
        dataRow.push({
            id: id,
            priority: priority,
            amount: amount,
            craftedAmount: 0,
        });
    }

    // Sort the items by priority; then by amount in reverse
    dataRow
        .sort((a: Item, b: Item): number => {
            if (a.priority !== b.priority) return a.priority - b.priority;

            return a.amount - b.amount;
        })
        .reverse();

    refreshDataView();
}

/**
 * Rebuild the UI showing all the item to manufacture.
 *
 * We clear the entire thing and rebuild from scratch.
 */
function refreshDataView() {
    const dataRegistry = configRegistry.dataView;
    const templateRef = dataRegistry.itemCardTemplate;

    dataRegistry.rootElement.innerHTML = '';

    for (const row of choreoData) {
        for (const entry of row) {
            const template = templateRef.cloneNode(true) as HTMLTemplateElement;
            const templateComponents = getTemplateChilds(template, [
                'item-card',
                'item-name',
                'item-amount',
                'item-cost',
                'item-priority',
                'remove-card',
            ]);

            const item = itemData.get(entry.id);
            if (item === undefined) continue;

            templateComponents['item-name'].textContent = item.name;
            templateComponents['item-cost'].textContent = Cost.makeCostString(
                item.cost
            );
            templateComponents['item-amount'].textContent =
                entry.amount.toString();
            templateComponents['item-priority'].textContent =
                Priority_priorityToString(entry.priority);
            templateComponents['remove-card'].addEventListener('click', () => {
                templateComponents['item-card'].remove();
            });

            dataRegistry.rootElement.appendChild(template.content);
        }
    }
}
