import { DomRegistry_getRegistry } from '../data/dom-registry';
import { itemData } from '../data/item-data';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import type { UserData } from '../types/user-data';

let ENABLE_LOCAL_STORAGE: boolean;
let USER_DATA: UserData;
let PREFER_DARK_THEME: boolean;
const DATA_KEY = 'userdata';
const THEME_KEY = 'theme';

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
    const themeData = storageInstance.getItem(THEME_KEY);

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

    if (themeData !== null) {
        PREFER_DARK_THEME = themeData === 'true';
    } else {
        PREFER_DARK_THEME = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
    }
}

/**
 * Update manufacture part of user data
 *
 * @param startTime The manufacturing start time for updating time spent
 * @param craftedItems Which item has been manufactured
 */
export function UserStats_manufactureUpdate(
    startTime: number,
    craftedItems: Item[][]
) {
    if (!ENABLE_LOCAL_STORAGE) return;

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
    ENABLE_LOCAL_STORAGE = isLocalStorageAvailable();

    if (ENABLE_LOCAL_STORAGE) {
        loadUserData();
    }

    // Display mode hijacking here as it depends on UserData
    const themeButton = DomRegistry_getRegistry().themeButton;
    updateTheme(themeButton);

    themeButton.addEventListener('click', () => {
        PREFER_DARK_THEME = !PREFER_DARK_THEME;
        updateTheme(themeButton);

        if (ENABLE_LOCAL_STORAGE) {
            window.localStorage.setItem(THEME_KEY, String(PREFER_DARK_THEME));
        }
    });
}

function updateTheme(themeButton: HTMLButtonElement) {
    if (PREFER_DARK_THEME) {
        themeButton.innerText = 'Light';
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        themeButton.innerText = 'Dark';
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
