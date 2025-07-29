import { itemData } from '../data/item-data';
import { generateCostString, getTemplateChildOrThrow } from '../helper';
import type { Item } from '../types/item';
import { Priority_priorityToString, type Priority } from '../types/priority';

export function addItemCard(
    itemID: number,
    amount: number,
    priority: Priority
) {
    const colRef = dataStore.columnReference[itemData[itemID].type].reference;
    const colData = dataStore.columnReference[itemData[itemID].type].items;
    const item: Item = {
        id: itemID,
        amount: amount,
        priority: priority,
    };

    let t = 0;

    for (t = 0; t < colData.length; t++) {
        if ((colData[t] as Item).id === itemID) {
            colData[t] = item;
            t = -1;
            break;
        }
    }

    if (t !== -1) {
        colData.push(item);
    }

    colData
        .sort((a: Item, b: Item): number => {
            if (a.priority !== b.priority) return a.priority - b.priority;

            return a.amount - b.amount;
        })
        .reverse();

    colRef.innerHTML = '';

    colData.forEach((item: Item) => {
        const itemCard = createItemCard(item.id, item.amount, item.priority);
        colRef.appendChild(itemCard.content);
    });
}

function createItemCard(
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
        const colData = dataStore.columnReference[itemData[itemID].type].items;

        for (let index = 0; index < colData.length; index++) {
            if ((colData[index] as Item).id === itemID) {
                colData.splice(index, 1);
            }
        }

        itemCardElemRef['item-card'].remove();
    });

    return itemCardTemplate;
}
