import { itemData } from './data/item-data';
import { getElementReference } from './helper';
import { manuInit, stopManu } from './manu';
import type { Item } from './types/item';
import type { ItemData } from './types/item-data';
import { ItemType_getIterator } from './types/item-type';
import { addItem } from './widgets/add-item-button';
import { importLogihub } from './widgets/import-logihub-button';
import { createItemCardTemplate } from './widgets/item-card';

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

function constructDataStore() {
    const sortedItems: Item[][] = [];

    ItemType_getIterator().forEach(() => {
        sortedItems.push([]);
    });

    window.dataStore = {
        sortedItems: sortedItems,
        dataViewRef: getElementReference('data-view'),
        manuViewRef: {
            crateCrafted: getElementReference('crate-crafted'),
            timeSpent: getElementReference('time-spent'),
            itemToCraft: getElementReference('item-to-craft'),
            costToCraft: getElementReference('cost-to-craft'),
            intervalRef: 0,
        },
        templateReference: {
            itemCard: getElementReference('item-card-template'),
        },
    };
}

export function initializeApp() {
    constructDataStore();

    getElementReference('submit-item-button').addEventListener(
        'click',
        addItem
    );

    getElementReference('submit-logihub-import').addEventListener(
        'click',
        importLogihub
    );

    getElementReference('start-manu-button').addEventListener('click', () => {
        dataStore.sortedItems.forEach((list: Item[]) => {
            list.forEach((item: Item) => {
                item.amount = Math.ceil(item.amount / 4);
            });

            list.sort((a: Item, b: Item): number => {
                if (a.priority !== b.priority) return a.priority - b.priority;

                return a.amount - b.amount;
            }).reverse();
        });

        dataStore.dataViewRef.innerHTML = '';

        getElementReference('title').innerText = 'Manu';

        manuInit();
    });

    getElementReference('stop-manu-button').addEventListener('click', () => {
        stopManu();
        clearInterval(dataStore.manuViewRef.intervalRef);
        getElementReference('manu-view').className = 'hidden';
        getElementReference('stop-manu-button').className = 'hidden';
        getElementReference('result-view').className = '';
        getElementReference('title').innerText = 'Result';
    });

    getElementReference('return-button').addEventListener('click', () => {
        dataStore.sortedItems.forEach((list: Item[]) => {
            list.forEach((item: Item) => {
                item.amount = (item.amount - item.craftedAmount) * 4;
                item.craftedAmount = 0;

                if (item.amount === 0) {
                    return;
                }

                dataStore.dataViewRef.appendChild(
                    createItemCardTemplate(item.id, item.amount, item.priority)
                        .content
                );
            });
        });

        getElementReference('config-view').className = '';
        getElementReference('start-manu-button').className = '';
        getElementReference('result-view').className = 'hidden';
        getElementReference('title').innerText = 'Config';
    });

    populateItemNameList();
}
