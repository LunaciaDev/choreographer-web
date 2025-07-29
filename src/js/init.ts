import { itemData } from './data/item-data';
import { getTemplateChildOrThrow } from './helper';
import type { ItemData } from './types/item-data';
import { ItemType_getIterator, ItemType_getLabel } from './types/item-type';
import { addItem } from './widgets/add-item-button';
import { createItemColumn } from './widgets/item-column';

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

/**
 * Populate the data view with all the item columns.
 */
function populateDataView() {
    const dataView = document.getElementById('data-view');

    if (!dataView) {
        throw new Error('Cannot find data-view element');
    }

    for (const type of ItemType_getIterator()) {
        const column = createItemColumn(ItemType_getLabel(type));
        const innerItemList = getTemplateChildOrThrow(
            column,
            'item-column-template',
            ['item-list']
        )['item-list'];

        window.dataStore.columnReference.push({
            reference: innerItemList,
            items: [],
        });

        dataView.appendChild(column.content);
    }
}

function getTemplateReference(id: string): HTMLElement {
    const node = document.getElementById(id);

    if (node === null) {
        throw new Error(`Cannot find template ${id}`);
    }

    return node;
}

function constructDOMReference() {
    window.dataStore = {
        columnReference: [],
        templateReference: {
            itemCard: getTemplateReference('item-card-template'),
            itemColumn: getTemplateReference('item-column-template'),
        },
    };
}

export function initializeApp() {
    constructDOMReference();

    document
        .getElementById('submit-item-button')
        ?.addEventListener('click', addItem);

    populateItemNameList();
    populateDataView();
}
