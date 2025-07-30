import { itemData } from '../data/item-data';
import { generateCostString, getTemplateChildOrThrow } from '../helper';
import type { Item } from '../types/item';
import { Priority_priorityToString, type Priority } from '../types/priority';

export function addItemCard(
    itemID: number,
    amount: number,
    priority: Priority
) {
    const item: Item = {
        id: itemID,
        amount: amount,
        priority: priority,
    };
    const itemType = itemData[item.id].type;

    if (dataStore.sortedItems[itemType] === undefined) {
        throw new Error('Undefined itemType');
    }

    const itemsList = dataStore.sortedItems[itemType] as Item[];

    let t = 0;

    for (t = 0; t < itemsList.length; t++) {
        if (itemsList[t].id === itemID) {
            itemsList[t] = item;
            t = -1;
            break;
        }
    }

    if (t !== -1) {
        itemsList.push(item);
    }

    /** Need not to sort right now, saving this for later
    itemsList
        .sort((a: Item, b: Item): number => {
            if (a.priority !== b.priority) return a.priority - b.priority;

            return a.amount - b.amount;
        })
        .reverse();
    **/

    // rerender the datastore
    dataStore.dataViewRef.innerHTML = '';

    dataStore.sortedItems.forEach((itemsList: Item[]) => {
        itemsList.forEach((item: Item) => {
            dataStore.dataViewRef.appendChild(
                createItemCardTemplate(item.id, item.amount, item.priority)
                    .content
            );
        });
    });
}

function createItemCardTemplate(
    itemID: number,
    amount: number,
    priority: Priority
): HTMLTemplateElement {
    const itemCardTemplate = dataStore.templateReference.itemCard.cloneNode(
        true
    ) as HTMLTemplateElement;
    const itemCardClassNames = [
        'item-card',
        'item-name',
        'item-amount',
        'item-cost',
        'item-priority',
        'remove-card',
    ];
    const itemCardElemRef = getTemplateChildOrThrow(
        itemCardTemplate,
        'item-card-template',
        itemCardClassNames
    );

    itemCardElemRef['item-name'].textContent = itemData[itemID].name;
    itemCardElemRef['item-amount'].textContent = amount.toString();
    itemCardElemRef['item-cost'].textContent = generateCostString(itemID);
    itemCardElemRef['item-priority'].textContent =
        Priority_priorityToString(priority);
    itemCardElemRef['remove-card'].addEventListener('click', () => {
        const itemsList = dataStore.sortedItems[itemData[itemID].type];

        for (let index = 0; index < itemsList.length; index++) {
            if ((itemsList[index] as Item).id === itemID) {
                itemsList.splice(index, 1);
            }
        }

        itemCardElemRef['item-card'].remove();
    });

    return itemCardTemplate;
}
