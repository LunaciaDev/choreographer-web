import { itemData } from './data/item-data';
import {
    getElementReference,
    getTemplateChildOrThrow as getTemplateChild,
} from './helper';
import type { Item } from './types/item';
import { ItemType } from './types/item-type';

let itemLineTemplate: HTMLTemplateElement;

document.addEventListener('DOMContentLoaded', () => {
    getElementReference('rq-lightarm').addEventListener('click', () => {
        addQueue(ItemType.LIGHT_ARM);
    });
    getElementReference('rq-heavyarm').addEventListener('click', () => {
        addQueue(ItemType.HEAVY_ARM);
    });
    getElementReference('rq-heavyshell').addEventListener('click', () => {
        addQueue(ItemType.HEAVY_SHELL);
    });
    getElementReference('rq-utilities').addEventListener('click', () => {
        addQueue(ItemType.UTILITIES);
    });
    getElementReference('rq-medical').addEventListener('click', () => {
        addQueue(ItemType.MEDICAL);
    });
    getElementReference('rq-uniform').addEventListener('click', () => {
        addQueue(ItemType.UNIFORM);
    });
    getElementReference('rq-crafted').addEventListener(
        'click',
        completeCurrent
    );

    itemLineTemplate = getElementReference(
        'manu-item-line-template'
    ) as HTMLTemplateElement;
});

type CurrentCrafts = {
    queuesToCraft: { id: number; itemType: ItemType }[];
    totalCost: {
        bmat: number;
        emat: number;
        rmat: number;
        hemat: number;
    };
    queued: { id: number; itemType: ItemType }[];
    crateCrafted: number;
};

const toCraft: CurrentCrafts = {
    queuesToCraft: [],
    totalCost: {
        bmat: 0,
        emat: 0,
        rmat: 0,
        hemat: 0,
    },
    queued: [],
    crateCrafted: 0,
};

function resetManu() {
    toCraft.queuesToCraft = [];
    toCraft.queued = [];
    toCraft.totalCost.bmat = 0;
    toCraft.totalCost.emat = 0;
    toCraft.totalCost.rmat = 0;
    toCraft.totalCost.hemat = 0;
    toCraft.crateCrafted = 0;

    dataStore.manuViewRef.costToCraft.innerHTML = '0b (0c)';
    dataStore.manuViewRef.crateCrafted.innerHTML = '0';
    dataStore.manuViewRef.itemToCraft.innerHTML = '';
    dataStore.manuViewRef.timeSpent.innerHTML = '0s';
}

function getTotalCost(itemId: number): number {
    return (
        Math.ceil(
            (toCraft.totalCost.bmat + itemData[itemId].cost.bmat * 4) / 100
        ) *
            100 +
        Math.ceil(
            (toCraft.totalCost.emat + itemData[itemId].cost.emat * 4) / 100
        ) *
            100 +
        Math.ceil(
            (toCraft.totalCost.rmat + itemData[itemId].cost.rmat * 4) / 100
        ) *
            100 +
        Math.ceil(
            (toCraft.totalCost.hemat + itemData[itemId].cost.hemat * 4) / 100
        ) *
            100
    );
}

function addQueue(itemType: ItemType) {
    for (const item of dataStore.sortedItems[itemType] as Item[]) {
        if (item.amount === item.craftedAmount) continue;

        item.craftedAmount += 1;

        /**
         * Usually 2 slots are unusable, so we have 13 slots -> 1300 total loose items
         *
         * We need to round the cost up to 100 to represent slot consumption.
         *
         * A better condition could be obtained by asking for what is in truck,
         * but that would be extremely annoying. We could ask for a stream of game
         * images to guess how many slot are free, but the tech requirement...
         *
         * Or 1500 limit, but show slot consumption so player can kicks item out
         * to the queue if it doesnt fit? Maybe?
         */
        if (getTotalCost(item.id) > 1300) {
            toCraft.queued.push({ id: item.id, itemType: itemType });
            return;
        }

        toCraft.queuesToCraft.push({ id: item.id, itemType: itemType });

        toCraft.totalCost.bmat += itemData[item.id].cost.bmat * 4;
        toCraft.totalCost.emat += itemData[item.id].cost.emat * 4;
        toCraft.totalCost.rmat += itemData[item.id].cost.rmat * 4;
        toCraft.totalCost.hemat += itemData[item.id].cost.hemat * 4;

        createLine(item.id);
        showCost();
        checkButtons();

        return;
    }
}

function createLine(id: number) {
    const template = itemLineTemplate.cloneNode(true) as HTMLTemplateElement;
    const templateRef = getTemplateChild(template, 'manu-item-line-template', [
        'manu-item-name',
        'remove-line',
        'manu-item-line',
        'push-back-line',
    ]);

    templateRef['manu-item-name'].innerText = itemData[id].name;
    templateRef['remove-line'].addEventListener('click', () => {
        removeQueue(id, templateRef['manu-item-line']);
    });
    templateRef['push-back-line'].addEventListener('click', () => {
        for (let index = 0; index < toCraft.queuesToCraft.length; index++) {
            if (toCraft.queuesToCraft[index].id !== id) continue;

            dataStore.sortedItems[
                toCraft.queuesToCraft[index].itemType
            ].forEach((item: Item) => {
                if (item.id !== id) return;

                toCraft.totalCost.bmat -= itemData[item.id].cost.bmat * 4;
                toCraft.totalCost.emat -= itemData[item.id].cost.emat * 4;
                toCraft.totalCost.rmat -= itemData[item.id].cost.rmat * 4;
                toCraft.totalCost.hemat -= itemData[item.id].cost.hemat * 4;
            });

            toCraft.queued.push(toCraft.queuesToCraft[index]);
            toCraft.queuesToCraft.splice(index, 1);
            templateRef['manu-item-line'].remove();
            showCost();
            return;
        }
    });
    dataStore.manuViewRef.itemToCraft.appendChild(template.content);
}

function showCost() {
    const res = [];

    // always show at least 0b (0c)
    res.push(
        `${toCraft.totalCost.bmat}b (${Math.ceil(toCraft.totalCost.bmat / 100)}c)`
    );

    if (toCraft.totalCost.emat !== 0) {
        res.push(
            `${toCraft.totalCost.emat}e (${Math.ceil(toCraft.totalCost.emat / 40)}c)`
        );
    }

    if (toCraft.totalCost.rmat !== 0) {
        res.push(
            `${toCraft.totalCost.rmat}r (${Math.ceil(toCraft.totalCost.rmat / 20)}c)`
        );
    }

    if (toCraft.totalCost.hemat !== 0) {
        res.push(
            `${toCraft.totalCost.hemat}he (${Math.ceil(toCraft.totalCost.hemat / 30)}c)`
        );
    }

    dataStore.manuViewRef.costToCraft.innerText = res.join(', ');
}

function completeCurrent() {
    toCraft.crateCrafted += 4 * toCraft.queuesToCraft.length;

    toCraft.queuesToCraft = [];
    toCraft.totalCost.bmat = 0;
    toCraft.totalCost.emat = 0;
    toCraft.totalCost.rmat = 0;
    toCraft.totalCost.hemat = 0;

    dataStore.manuViewRef.itemToCraft.innerHTML = '';
    dataStore.manuViewRef.crateCrafted.innerText =
        toCraft.crateCrafted.toString();

    pushUpQueue();
}

function pushUpQueue() {
    for (let index = 0; index < toCraft.queued.length; index++) {
        const id = toCraft.queued[index].id;

        if (getTotalCost(id) <= 1300) {
            toCraft.queuesToCraft.push(toCraft.queued[index]);

            toCraft.totalCost.bmat += itemData[id].cost.bmat * 4;
            toCraft.totalCost.emat += itemData[id].cost.emat * 4;
            toCraft.totalCost.rmat += itemData[id].cost.rmat * 4;
            toCraft.totalCost.hemat += itemData[id].cost.hemat * 4;

            createLine(id);

            toCraft.queued.splice(index, 1);
            index -= 1;
        }
    }

    showCost();
}

function removeQueue(id: number, selfRef: HTMLElement) {
    for (let index = 0; index < toCraft.queuesToCraft.length; index++) {
        if (toCraft.queuesToCraft[index].id !== id) continue;

        dataStore.sortedItems[toCraft.queuesToCraft[index].itemType].forEach(
            (item: Item) => {
                if (item.id !== id) return;

                item.craftedAmount -= 1;
                toCraft.totalCost.bmat -= itemData[item.id].cost.bmat * 4;
                toCraft.totalCost.emat -= itemData[item.id].cost.emat * 4;
                toCraft.totalCost.rmat -= itemData[item.id].cost.rmat * 4;
                toCraft.totalCost.hemat -= itemData[item.id].cost.hemat * 4;
            }
        );

        toCraft.queuesToCraft.splice(index, 1);
        selfRef.remove();
        pushUpQueue();
        checkButtons();
    }
}

function checkButtons() {
    const className = [
        'rq-lightarm',
        'rq-heavyarm',
        'rq-heavyshell',
        'rq-medical',
        'rq-utilities',
        'rq-uniform',
    ];

    for (let index = 0; index < dataStore.sortedItems.length; index++) {
        const queue = dataStore.sortedItems[index] as Item[];

        if (
            queue.length === 0 ||
            queue[queue.length - 1].amount ===
                queue[queue.length - 1].craftedAmount
        ) {
            getElementReference(className[index]).setAttribute(
                'disabled',
                'disabled'
            );
        } else {
            getElementReference(className[index]).removeAttribute('disabled');
        }
    }

    if (toCraft.queuesToCraft.length === 0) {
        getElementReference('rq-crafted').setAttribute('disabled', 'disabled');
    } else {
        getElementReference('rq-crafted').removeAttribute('disabled');
    }
}

export function manuInit() {
    (getElementReference('logihub-import-paste') as HTMLTextAreaElement).value =
        '';
    getElementReference('item-name').textContent = '';
    getElementReference('amount').textContent = '';
    (getElementReference('priority') as HTMLSelectElement).value = '-';

    getElementReference('config-view').className = 'hidden';
    getElementReference('manu-view').className = '';
    getElementReference('start-manu-button').className = 'hidden';
    getElementReference('stop-manu-button').className = '';

    const startTime = Date.now();

    dataStore.manuViewRef.intervalRef = setInterval(() => {
        const secondSinceStart = Math.ceil((Date.now() - startTime) / 1000);

        // years, months, days, hours, minutes, seconds
        // I dont know which brave soul will even see days, but better not challenge the players.

        // big scary constants

        const timePart: number[] = [
            Math.floor(secondSinceStart / 31_557_600), // year
            Math.floor(secondSinceStart / 2_629_800), // month
            Math.floor(secondSinceStart / 86_400), // day
            Math.floor(secondSinceStart / 3_600), // hour
            Math.floor(secondSinceStart / 60), // minute
            secondSinceStart % 60, // second
        ];
        const postfix = ['y', 'm', 'd', 'h', 'm', 's'];

        const res: string[] = [];

        for (let i = 0; i < 6; i++) {
            if (timePart[i] == 0) continue;

            res.push(timePart[i].toString().concat(postfix[i]));
        }

        dataStore.manuViewRef.timeSpent.innerText = res.join(' ');
    }, 1000);

    resetManu();
    checkButtons();
}

export function stopManu() {
    toCraft.queuesToCraft.forEach((item) => {
        for (const i of dataStore.sortedItems[item.itemType] as Item[]) {
            if (i.id !== item.id) continue;

            i.craftedAmount -= 1;
            return;
        }
    });

    toCraft.queued.forEach((item) => {
        for (const i of dataStore.sortedItems[item.itemType] as Item[]) {
            if (i.id !== item.id) continue;

            i.craftedAmount -= 1;
            return;
        }
    });

    // populate result view
    getElementReference('result-time').innerText =
        dataStore.manuViewRef.timeSpent.innerText;

    getElementReference('result-crate').innerText =
        dataStore.manuViewRef.crateCrafted.innerText;

    const resultRef = getElementReference('result-item-crafted');
    resultRef.innerHTML = '';
    const resultItemCard = getElementReference('result-item-card');

    dataStore.sortedItems.forEach((queue: Item[]) => {
        queue.forEach((item: Item) => {
            if (item.craftedAmount !== 0) {
                const itemCard = resultItemCard.cloneNode(
                    true
                ) as HTMLTemplateElement;
                const itemCardRefs = getTemplateChild(
                    itemCard,
                    'result-item-card',
                    ['item-name', 'item-amount']
                );

                itemCardRefs['item-name'].innerText = itemData[item.id].name;
                itemCardRefs['item-amount'].innerText =
                    item.craftedAmount.toString();

                resultRef.appendChild(itemCard.content);
            }
        });
    });
}
