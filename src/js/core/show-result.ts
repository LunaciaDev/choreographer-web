import {
    DomRegistry_getRegistry,
    DomRegistry_getResultView,
} from '../data/dom-registry';
import { itemData } from '../data/item-data';
import { getTemplateChilds } from '../helper';
import type { ResultView } from '../types/dom-registry';
import type { Item } from '../types/item';
import { ChoreoConfig_start } from './choreo-config';

let resultRegistry: ResultView;

export function ShowResult_init() {
    resultRegistry = DomRegistry_getResultView();

    resultRegistry.returnButton.addEventListener('click', () => {
        resultRegistry.rootElement.className = 'hidden';
        ChoreoConfig_start();
    });
}

export function ShowResult_show(queuedItem: Item[][], time: string) {
    resultRegistry.itemCrafted.innerHTML = '';
    resultRegistry.timeSpent.innerText = time;
    resultRegistry.rootElement.className = '';
    DomRegistry_getRegistry().titleRef.innerText = 'Result';

    let amountCrafted = 0;

    for (let rowIndex = 0; rowIndex < queuedItem.length; rowIndex++) {
        const row = queuedItem[rowIndex];

        for (let index = 0; index < row.length; index++) {
            const item = row[index];

            if (item.craftedAmount === 0) continue;

            amountCrafted += item.craftedAmount;
            addLine(item.id, item.craftedAmount);

            if (item.amount === item.craftedAmount) {
                row.splice(index, 1);
            }

            item.amount -= item.craftedAmount;
            item.craftedAmount = 0;
        }
    }

    resultRegistry.crateCrafted.innerText = amountCrafted.toString();

    function addLine(itemId: number, amount: number) {
        const item = itemData[itemId];
        const template = resultRegistry.itemCardTemplate.cloneNode(
            true
        ) as HTMLTemplateElement;
        const templateElements = getTemplateChilds(template, [
            'item-name',
            'item-amount',
        ]);

        templateElements['item-name'].innerText = item.name;
        templateElements['item-amount'].innerHTML = amount.toString();

        resultRegistry.itemCrafted.appendChild(template.content);
    }
}
