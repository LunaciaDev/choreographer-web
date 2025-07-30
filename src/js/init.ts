import { itemData } from './data/item-data';
import type { Item } from './types/item';
import type { ItemData } from './types/item-data';
import { ItemType_getIterator } from './types/item-type';
import { addItem } from './widgets/add-item-button';
import { importLogihub } from './widgets/import-logihub-button';

/**
 * Populate the item-name-list <datalist> in the application.
 *
 * We read the items data, for each item, create an <option>
 * for the item-name-list with the name of the item.
 */
function populateItemNameList() {
    const itemList = document.getElementById('item-names-list');

    if (!itemList) {
        throw new Error('Cannot find item-names-list');
    }

    itemData.forEach((item: ItemData) => {
        const itemOption = document.createElement('option');
        itemOption.value = item.name;

        itemList.appendChild(itemOption);
    });
}

function getElementReference(id: string): HTMLElement {
    const node = document.getElementById(id);

    if (node === null) {
        throw new Error(`Cannot find template ${id}`);
    }

    return node;
}

function constructDataStore() {
    const sortedItems: Item[][] = [];

    ItemType_getIterator().forEach(() => {
        sortedItems.push([]);
    });

    window.dataStore = {
        sortedItems: sortedItems,
        dataViewRef: getElementReference('data-view'),
        templateReference: {
            itemCard: getElementReference('item-card-template'),
        },
    };
}

export function initializeApp() {
    constructDataStore();

    document
        .getElementById('submit-item-button')
        ?.addEventListener('click', addItem);

    document
        .getElementById('submit-logihub-import')
        ?.addEventListener('click', importLogihub);

    populateItemNameList();
}
