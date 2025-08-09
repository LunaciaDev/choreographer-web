import {
    DomRegistry_getManuView,
    DomRegistry_getRegistry,
} from '../data/dom-registry';
import { itemData } from '../data/item-data';
import { getTemplateChilds } from '../helper';
import type { ManuView } from '../types/dom-registry';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import { ItemType } from '../types/item-type';
import { ShowResult_show } from './show-result';

let manuRegistry: ManuView;
let configuredItems: Item[][];
let queuedItems: number[];
let currentCost: Cost;
let timeRef: number;
let startTime: number;
let crateCrafted: number;

export function Manu_init() {
    manuRegistry = DomRegistry_getManuView();
    currentCost = new Cost();

    manuRegistry.controls.lightArm.addEventListener('click', () => {
        addQueue(ItemType.LIGHT_ARM);
    });
    manuRegistry.controls.heavyArm.addEventListener('click', () => {
        addQueue(ItemType.HEAVY_ARM);
    });
    manuRegistry.controls.heavyShell.addEventListener('click', () => {
        addQueue(ItemType.HEAVY_SHELL);
    });
    manuRegistry.controls.utilities.addEventListener('click', () => {
        addQueue(ItemType.UTILITIES);
    });
    manuRegistry.controls.medical.addEventListener('click', () => {
        addQueue(ItemType.MEDICAL);
    });
    manuRegistry.controls.uniform.addEventListener('click', () => {
        addQueue(ItemType.UNIFORM);
    });
    manuRegistry.controls.submitButton.addEventListener('click', submitItems);

    manuRegistry.stopManu.addEventListener('click', () => {
        ShowResult_show(
            configuredItems,
            manuRegistry.statisticLabels.timeSpent.innerText
        );
        clearInterval(timeRef);
        manuRegistry.stopManu.className = 'hidden';
        manuRegistry.rootElement.className = 'hidden';
    });
}

export function Manu_start(data: Item[][]) {
    configuredItems = data;
    crateCrafted = 0;

    DomRegistry_getRegistry().titleRef.innerText = 'Manu';

    for (const row of configuredItems) {
        for (const item of row) {
            item.amount = Math.ceil(item.amount / 4) * 4;
        }
    }

    queuedItems = [];

    startTime = Date.now();
    timeRef = setInterval(() => {
        const currentTime = Date.now();
        let relativeTime = Math.ceil((currentTime - startTime) / 1000); // second since startTime
        const data: [number, string][] = [
            [60, 's'],
            [60, 'm'],
            [24, 'h'],
            [30, 'd'],
            [12, 'm'],
            [1, 'y'],
        ];
        const result = [];

        for (const row of data) {
            result.push(`${relativeTime % row[0]}${row[1]}`);
            relativeTime = Math.floor(relativeTime / row[0]);
            if (relativeTime === 0) break;
        }

        manuRegistry.statisticLabels.timeSpent.innerText = result
            .reverse()
            .join(' ');
    }, 1000);

    currentCost.reset();

    manuRegistry.statisticLabels.costToCraft.innerText = currentCost.toString();
    manuRegistry.statisticLabels.crateCrafted.innerText = '0';

    refreshButtons();

    manuRegistry.stopManu.className = 'accent';
    manuRegistry.rootElement.className = '';
}

function addQueue(itemType: ItemType) {
    // [TODO]: Create feedback for clicks
    const itemRow = configuredItems[itemType];

    if (itemRow.length === 0) return;

    for (const item of itemRow) {
        if (item.amount === item.craftedAmount) continue;

        const itemCost = itemData[item.id].cost;

        item.craftedAmount += 4;

        if (currentCost.getTheoreticalSlotCost(itemCost) > 13) {
            queuedItems.push(item.id);
            break;
        }

        addItemCard(item.id);
        break;
    }

    refreshButtons();
}

function submitItems() {
    // [TODO]: Create clicks feedback
    manuRegistry.statisticLabels.itemToCraft.innerHTML = '';
    currentCost.reset();
    manuRegistry.statisticLabels.crateCrafted.innerText =
        crateCrafted.toString();
    manuRegistry.statisticLabels.costToCraft.innerText = currentCost.toString();

    for (let index = 0; index < queuedItems.length; index++) {
        const itemId = queuedItems[index];
        const itemCost = itemData[itemId].cost;

        if (currentCost.getTheoreticalSlotCost(itemCost) <= 13) {
            addItemCard(itemId);
            queuedItems.splice(index, 1);
            index -= 1;
        }

        if (currentCost.getCurrentSlotCost() > 13) break;
    }

    refreshButtons();
}

function addItemCard(itemId: number) {
    const template = manuRegistry.statisticLabels.itemCardTemplate.cloneNode(
        true
    ) as HTMLTemplateElement;
    const templateElements = getTemplateChilds(template, [
        'manu-item-name',
        'manu-item-line',
        'remove-line',
        'push-back-line',
    ]);

    currentCost.add(itemData[itemId].cost);

    templateElements['manu-item-name'].textContent = itemData[itemId].name;
    templateElements['remove-line'].addEventListener('click', () => {
        // [TODO]: Create feedback for clicks
        const itemType = itemData[itemId].type;
        const itemRow = configuredItems[itemType];

        crateCrafted -= 4;

        currentCost.subtract(itemData[itemId].cost);

        for (const item of itemRow) {
            if (item.id !== itemId) continue;

            item.craftedAmount -= 4;
        }

        templateElements['manu-item-line'].remove();
        manuRegistry.statisticLabels.costToCraft.textContent =
            currentCost.toString();

        refreshButtons();
    });
    templateElements['push-back-line'].addEventListener('click', () => {
        queuedItems.push(itemId);
        currentCost.subtract(itemData[itemId].cost);

        templateElements['manu-item-line'].remove();
        manuRegistry.statisticLabels.costToCraft.textContent =
            currentCost.toString();
    });

    manuRegistry.statisticLabels.itemToCraft.appendChild(template.content);
    manuRegistry.statisticLabels.costToCraft.textContent =
        currentCost.toString();
    crateCrafted += 4;
}

function refreshButtons() {
    if (manuRegistry.statisticLabels.itemToCraft.innerHTML === '') {
        manuRegistry.controls.submitButton.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.submitButton.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.LIGHT_ARM)) {
        manuRegistry.controls.lightArm.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.lightArm.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.HEAVY_ARM)) {
        manuRegistry.controls.heavyArm.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.heavyArm.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.HEAVY_SHELL)) {
        manuRegistry.controls.heavyShell.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.heavyShell.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.MEDICAL)) {
        manuRegistry.controls.medical.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.medical.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.UTILITIES)) {
        manuRegistry.controls.utilities.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.utilities.removeAttribute('disabled');
    }

    if (isQueueEmpty(ItemType.UNIFORM)) {
        manuRegistry.controls.uniform.setAttribute('disabled', 'disabled');
    } else {
        manuRegistry.controls.uniform.removeAttribute('disabled');
    }

    function isQueueEmpty(itemType: ItemType): boolean {
        const itemRow = configuredItems[itemType];

        if (itemRow.length === 0) return true;

        if (
            itemRow[itemRow.length - 1].amount ===
            itemRow[itemRow.length - 1].craftedAmount
        )
            return true;

        return false;
    }
}
