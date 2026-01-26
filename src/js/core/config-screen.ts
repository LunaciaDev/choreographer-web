import { item_data } from '../data/item-data';
import { get_template_elements } from '../helper';
import { FillLevel } from '../types/fill-level';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import { ItemType } from '../types/item-type';
import { Priority } from '../types/priority';

import {
    DomRegistry,
    type ConfigManualInput,
    type ConfigRegistry,
} from './dom-registry';
import { ManuScreen } from './manu-screen';

let config_data: Item[][];
let config_registry: ConfigRegistry;
let manual_input_registry: ConfigManualInput;

/**
 * As inputs are hinted, but not enforced, we need to double check
 * to make sure that everything is a-OK!
 *
 * - Name has to be one of the item's name.
 * - Priority has to be one of the possible value.
 * - Amount must be integer > 0.
 *
 * [TODO]: Create responses based on the sanitization result
 */
function sanitize_input() {
    const name = manual_input_registry.item_name.value;
    const raw_priority = manual_input_registry.item_priority.value;
    const raw_amount = manual_input_registry.item_amount.value;

    if (name === null || raw_amount === null) {
        // [TODO]: show something in the UI
        return;
    }

    const amount = parseInt(raw_amount);

    if (amount <= 0) {
        // [TODO]: show something in the UI
        return;
    }

    let itemID;

    for (let id = 0; id < item_data.length; id++) {
        const item = item_data[id];

        if (item.name === name) {
            itemID = id;
            break;
        }
    }

    if (itemID === undefined) {
        // [TODO]: show something in the UI
        return;
    }

    const priority = Priority.to_priority(raw_priority);

    manual_input_registry.item_name.value = '';
    manual_input_registry.item_amount.value = '';

    ConfigScreen.add_item(itemID, priority, amount, FillLevel.CUSTOM, -1);
}

/**
 * Rebuild the UI showing all the item to manufacture.
 *
 * We clear the entire thing and rebuild from scratch.
 */
function refresh_view() {
    const data_registry = config_registry.data_view;
    const template_ref = data_registry.item_card_template;

    data_registry.root_element.innerHTML = '';

    for (const row of config_data) {
        for (const entry of row) {
            const template = template_ref.cloneNode(
                true
            ) as HTMLTemplateElement;
            const template_elements = get_template_elements(template, [
                'item-card',
                'item-name',
                'item-amount',
                'item-cost',
                'item-priority',
                'remove-card',
            ]);

            const item = item_data[entry.id];
            if (item === undefined) continue;

            template_elements['item-name'].textContent = item.name;
            template_elements['item-cost'].textContent = Cost.make_cost_string(
                item.cost
            );
            template_elements['item-amount'].textContent =
                entry.amount.toString();
            template_elements['item-priority'].textContent = Priority.to_string(
                entry.priority
            );
            template_elements['remove-card'].addEventListener('click', () => {
                // [FIXME] Update internal data structure to remove this element...
                template_elements['item-card'].remove();
            });

            data_registry.root_element.appendChild(template.content);
        }
    }
}

export namespace ConfigScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        config_data = [];

        ItemType.get_iterator().forEach(() => {
            config_data.push([]);
        });

        config_registry = DomRegistry.get_config_registry();

        manual_input_registry = config_registry.manual_input;
        manual_input_registry.submit_button.addEventListener(
            'click',
            sanitize_input
        );

        // Populate item name input with possible options
        for (const item of item_data.values()) {
            const item_name = document.createElement('option');
            item_name.value = item.name;
            manual_input_registry.item_datalist.appendChild(item_name);
        }

        config_registry.start_manu.addEventListener('click', () => {
            config_registry.start_manu.className = 'hidden';
            config_registry.root_element.className = 'hidden';
            ManuScreen.start(config_data);
        });
    }

    /**
     * Change the current screen to Config Screen.
     */
    export function start() {
        config_registry.root_element.className = '';
        config_registry.start_manu.className = 'accent';
        DomRegistry.get_title().innerText = 'Config';

        refresh_view();
    }

    /**
     * Add an item to the to-manu list.
     *
     * If the item already exist in the list, overwrite it.
     *
     * @param id The item's internal ID
     * @param priority The item's priority
     * @param amount The amount to manu
     * @param fill_level The fill level reported by LogiHub; User-submission always has fill level CUSTOM.
     * @param fill_amount How much of the item is filled right now; Value is undefined for CUSTOM level
     */
    export function add_item(
        id: number,
        priority: Priority,
        amount: number,
        fill_level: FillLevel,
        _fill_amount: number
    ) {
        const item_type = item_data[id].type;
        if (item_type === undefined) return;

        const dataRow = config_data[item_type];
        let duplicated = false;

        for (const item of dataRow) {
            if (item.id === id) {
                item.priority = priority;
                item.amount = amount;
                duplicated = true;
                break;
            }
        }

        if (!duplicated) {
            dataRow.push({
                id: id,
                priority: priority,
                amount: amount,
                crafted_amount: 0,
                fill_level: fill_level,
            });
        }

        // Sort the items by priority; then by amount in reverse
        dataRow
            .sort((a: Item, b: Item): number => {
                if (a.priority !== b.priority) return a.priority - b.priority;

                return a.amount - b.amount;
            })
            .reverse();

        refresh_view();
    }
}
