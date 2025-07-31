import { itemData } from '../data/item-data';
import { Priority_stringToPriority } from '../types/priority';
import { addItemCard } from './item-card';

export function addItem() {
    const itemName = (document.getElementById('item-name') as HTMLInputElement)
        .value;
    const amount = Number.parseInt(
        (document.getElementById('amount') as HTMLInputElement).value
    );
    const priority = Priority_stringToPriority(
        (document.getElementById('priority') as HTMLInputElement).value
    );

    let itemID = -1;

    for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].name === itemName) {
            itemID = i;
            break;
        }
    }

    if (itemID == -1) {
        // [TODO] Show error in UI
        console.error('itemName invalid');
        return;
    }

    if (Number.isNaN(amount) || amount < 0) {
        // [TODO] Show error in UI
        console.error('amount invalid');
        itemID = -1;
    }

    addItemCard(itemID, amount, priority);
}
