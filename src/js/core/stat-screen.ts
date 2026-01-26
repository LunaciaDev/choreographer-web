import { item_data } from '../data/item-data';
import { duration_to_string } from '../helper';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import type { UserData } from '../types/user-data';
import { DomRegistry } from './dom-registry';

let enable_local_storage: boolean;
let user_data: UserData;
let prefer_dark_theme: boolean;

const DATA_KEY = 'userdata';
const THEME_KEY = 'theme';

function is_local_storage_available(): boolean {
    let storage_instance;

    try {
        storage_instance = window.localStorage;
        storage_instance.setItem('__test__', '__test__');
        storage_instance.removeItem('__test__');
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            storage_instance !== undefined &&
            storage_instance.length === 0
        );
    }
}

function load_user_data() {
    const storage_instance = window.localStorage;
    const raw_user_data = storage_instance.getItem(DATA_KEY);
    const raw_theme_data = storage_instance.getItem(THEME_KEY);

    if (raw_user_data !== null) {
        user_data = JSON.parse(raw_user_data) as UserData;
    } else {
        user_data = {
            crate_crafted: 0,
            material_consumed: new Cost(),
            item_crafted: [],
            time_spent: 0,
        };
    }

    if (raw_theme_data !== null) {
        prefer_dark_theme = raw_theme_data === 'true';
    } else {
        prefer_dark_theme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
    }
}

function update_theme(theme_button: HTMLButtonElement) {
    if (prefer_dark_theme) {
        theme_button.innerText = 'Light';
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        theme_button.innerText = 'Dark';
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function hide(): void {
    DomRegistry.get_stat_registry().root_element.className = 'hidden';
}

function show(): void {
    const screen_registry = DomRegistry.get_stat_registry();

    screen_registry.crate_count.innerText = user_data.crate_crafted.toString();
    screen_registry.time_spent.innerText = duration_to_string(
        user_data.time_spent
    );
    screen_registry.time_to_hundred_crate.innerText = duration_to_string(
        user_data.time_spent / (user_data.crate_crafted / 100)
    );

    screen_registry.bmat_used.innerText =
        user_data.material_consumed.bmat.toString();
    screen_registry.emat_used.innerText =
        user_data.material_consumed.emat.toString();
    screen_registry.hemat_used.innerText =
        user_data.material_consumed.hemat.toString();
    screen_registry.rmat_used.innerText =
        user_data.material_consumed.rmat.toString();

    screen_registry.root_element.className = 'overlay';
}

export namespace StatScreen {
    export function init(): void {
        enable_local_storage = is_local_storage_available();

        if (enable_local_storage) {
            load_user_data();
        }

        // Display mode hijacking here as it depends on UserData
        const theme_button = DomRegistry.get_theme_button();
        update_theme(theme_button);

        theme_button.addEventListener('click', () => {
            prefer_dark_theme = !prefer_dark_theme;
            update_theme(theme_button);

            if (enable_local_storage) {
                window.localStorage.setItem(
                    THEME_KEY,
                    String(prefer_dark_theme)
                );
            }
        });

        DomRegistry.get_stat_registry().root_element.addEventListener(
            'click',
            () => {
                hide();
            }
        );

        DomRegistry.get_stat_button().addEventListener('click', () => {
            show();
        });
    }

    /**
     * Update manufacture part of user data
     *
     * @param start_time The manufacturing start time for updating time spent
     * @param crafted_items Which item has been manufactured
     */
    export function update_manu_stat(
        start_time: number,
        crafted_items: Item[][]
    ): void {
        const end_time = Date.now();

        for (const row of crafted_items) {
            for (const item of row) {
                if (item.crafted_amount === 0) continue;

                const item_info = item_data[item.id];

                if (item_info === undefined) {
                    // [TODO]: Maybe throw some error here
                    continue;
                }

                user_data.crate_crafted += item.crafted_amount;
                user_data.material_consumed.multiply(
                    item.crafted_amount,
                    item_info.cost
                );

                for (const entry of user_data.item_crafted) {
                    if (entry.id === item.id) {
                        entry.amount += item.crafted_amount;
                        break;
                    }
                }
            }
        }

        user_data.time_spent += end_time - start_time;

        if (enable_local_storage) {
            window.localStorage.setItem(DATA_KEY, JSON.stringify(user_data));
        }
    }
}
