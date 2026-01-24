import { itemData } from '../data/item-data';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import type { UserData } from '../types/user-data';

let ENABLE_USER_STATS: boolean;
let USER_DATA: UserData;
const DATA_KEY = 'choreographer_userdata';

function isLocalStorageAvailable(): boolean {
    let storageInstance;

    try {
        storageInstance = window.localStorage;
        storageInstance.setItem('__test__', '__test__');
        storageInstance.removeItem('__test__');
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            storageInstance !== undefined &&
            storageInstance.length === 0
        );
    }
}

function loadUserData() {
    const storageInstance = window.localStorage;
    const userData = storageInstance.getItem(DATA_KEY);

    if (userData !== null) {
        USER_DATA = JSON.parse(userData) as UserData;
    } else {
        USER_DATA = {
            crateCreated: 0,
            materialConsumed: new Cost(),
            itemCrafted: [],
            timeSpent: 0,
        };
    }
}

/**
 * Update user data.
 *
 * @param startTime The manufacturing start time for updating time spent
 * @param craftedItems Which item has been manufactured
 */
export function UserStats_saveUserData(
    startTime: number,
    craftedItems: Item[][]
) {
    if (!ENABLE_USER_STATS) return;

    const endTime = Date.now();

    for (const row of craftedItems) {
        for (const item of row) {
            if (item.craftedAmount === 0) continue;

            const itemInfo = itemData.get(item.id);

            if (itemInfo === undefined) {
                // [TODO]: Maybe throw some error here
                continue;
            }

            USER_DATA.crateCreated += item.craftedAmount;
            USER_DATA.materialConsumed.multiply(
                item.craftedAmount,
                itemInfo.cost
            );

            for (const entry of USER_DATA.itemCrafted) {
                if (entry.id === item.id) {
                    entry.amount += item.craftedAmount;
                    break;
                }
            }
        }
    }

    USER_DATA.timeSpent += endTime - startTime;

    window.localStorage.setItem(DATA_KEY, JSON.stringify(USER_DATA));
}

export function UserStats_init() {
    ENABLE_USER_STATS = isLocalStorageAvailable();

    if (ENABLE_USER_STATS) {
        loadUserData();
    }
}
