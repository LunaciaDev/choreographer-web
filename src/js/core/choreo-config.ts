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

    for (const item of itemData) {
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

export function ChoreoConfig_start() {
    configRegistry.rootElement.className = '';
    configRegistry.startManu.className = 'accent';
    DomRegistry_getRegistry().titleRef.innerText = 'Config';

    refreshDataView();
}

function sanitizeManualInput() {
    const name = manualInputRegistry.itemName.value;
    const rawPriority = manualInputRegistry.itemPriority.value;
    const rawAmount = manualInputRegistry.itemAmount.value;

    if (name === null || rawAmount === null) {
        // [TODO]: show something in the UI
        return;
    }

    const amount = parseInt(rawAmount);
    let itemID = 0;
    let validName = false;

    for (itemID; itemID < itemData.length; itemID++) {
        const item = itemData[itemID];
        if (item.name === name) {
            validName = true;
            break;
        }
    }

    if (!validName) {
        // [TODO]: show something in the UI
        return;
    }

    const priority = Priority_stringToPriority(rawPriority);

    manualInputRegistry.itemName.value = '';
    manualInputRegistry.itemAmount.value = '';

    ChoreoConfig_addItem(itemID, priority, amount);
}

export function ChoreoConfig_addItem(
    id: number,
    priority: Priority,
    amount: number
) {
    const itemType = itemData[id].type;
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

    dataRow
        .sort((a: Item, b: Item): number => {
            if (a.priority !== b.priority) return a.priority - b.priority;

            return a.amount - b.amount;
        })
        .reverse();

    refreshDataView();
}

function refreshDataView() {
    const dataRegistry = configRegistry.dataView;
    const templateRef = dataRegistry.itemCardTemplate;

    dataRegistry.rootElement.innerHTML = '';

    for (const row of choreoData) {
        for (const item of row) {
            const template = templateRef.cloneNode(true) as HTMLTemplateElement;
            const templateComponents = getTemplateChilds(template, [
                'item-card',
                'item-name',
                'item-amount',
                'item-cost',
                'item-priority',
                'remove-card',
            ]);

            templateComponents['item-name'].textContent =
                itemData[item.id].name;
            templateComponents['item-cost'].textContent = Cost.makeCostString(
                itemData[item.id].cost
            );
            templateComponents['item-amount'].textContent =
                item.amount.toString();
            templateComponents['item-priority'].textContent =
                Priority_priorityToString(item.priority);
            templateComponents['remove-card'].addEventListener('click', () => {
                templateComponents['item-card'].remove();
            });

            dataRegistry.rootElement.appendChild(template.content);
        }
    }
}
