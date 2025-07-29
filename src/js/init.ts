import { itemData } from './data';
import { type Item, ItemType } from './types/item';
import { createItemColumn } from './widgets/item-column';

/**
 * Populate the item-name-list <datalist> in the application.
 *
 * We read the items data, for each item, create an <option>
 * for the item-name-list with the name of the item.
 *
 * @author LunaciaDev
 */
function populateItemNameList() {
    const itemList = document.getElementById('item-names-list');

    if (!itemList) {
        console.error(
            '[ERROR] Cannot initialize item-names-list: Id cannot be found in DOM.'
        );
        return;
    }

    itemData.forEach((item: Item) => {
        const itemOption = document.createElement('option');
        itemOption.value = item.name;

        itemList.appendChild(itemOption);
    });
}

function populateDataView() {
    const dataView = document.getElementById('data-view');

    if (!dataView) {
        console.error(
            '[ERROR] Cannot initialize data-view: Id cannot be found in DOM.'
        );
        return;
    }

    for (const [, itemName] of Object.entries(ItemType)) {
        const column = createItemColumn(itemName);

        dataView.appendChild(column);
    }
}

export function initializeApp() {
    populateItemNameList();
    populateDataView();
}
