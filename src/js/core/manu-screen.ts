import { item_data } from '../data/item-data';
import { duration_to_string, get_template_elements } from '../helper';
import type { Item } from '../types/item';
import { Cost } from '../types/item-cost';
import { ItemType } from '../types/item-type';
import { DomRegistry, type ManuRegistry } from './dom-registry';
import { ResultScreen } from './result-screen';
import { StatScreen } from './stat-screen';

let manu_registry: ManuRegistry;
let configured_items: Item[][];
let queued_items: number[];
let current_cost: Cost;
let time_ref: number;
let start_time: number;
let crate_crafted: number;

/**
 * Given an itemType, add to the queue the current most-prioritized that has not been finished.
 *
 * If the truck is suspected to be full (material require more than 13 slots to carry), move
 * the item to a different queue, automatically pushed to the main queue when it's submitted.
 *
 * @param item_type
 */
function add_queue(item_type: ItemType) {
    // [TODO]: Create feedback for clicks
    const row = configured_items[item_type];

    if (row.length === 0) return;

    for (const entry of row) {
        // if we reached the manu goal, find next one.
        if (entry.amount === entry.crafted_amount) continue;

        const cost = item_data[entry.id].cost;
        if (cost === undefined) continue;

        entry.crafted_amount += 4;

        // if the total cost require more than 13 slots, move to queue.
        if (current_cost.get_theoretical_cost_in_slots(cost) > 13) {
            queued_items.push(entry.id);
            break;
        }

        add_item_card(entry.id);
        break;
    }

    refresh_buttons();
}

/**
 * Clear the main queue, finalize changes and push items from the
 * waiting queue to the main queue.
 *
 * Same rules apply as addQueue.
 */
function submitItems() {
    // [TODO]: Create clicks feedback
    manu_registry.stat_label.item_to_craft.innerHTML = '';
    current_cost.reset();
    manu_registry.stat_label.crate_crafted.innerText = crate_crafted.toString();
    manu_registry.stat_label.cost_to_craft.innerText = current_cost.to_string();

    for (let index = 0; index < queued_items.length; index++) {
        const item_id = queued_items[index];
        const item_cost = item_data[item_id].cost;
        if (item_cost === undefined) return;

        if (current_cost.get_theoretical_cost_in_slots(item_cost) <= 13) {
            add_item_card(item_id);
            queued_items.splice(index, 1);
            index -= 1;
        }

        if (current_cost.get_cost_in_slots() > 13) break;
    }

    refresh_buttons();
}

/**
 * Add the item that has been moved to the main queue to the UI.
 *
 * User can remove it from the main queue (x button) or manually
 * push the item back to the waiting queue (- button).
 *
 * @param item_id The internal ID of the item
 */
function add_item_card(item_id: number) {
    const template = manu_registry.stat_label.item_card_template.cloneNode(
        true
    ) as HTMLTemplateElement;
    const template_elements = get_template_elements(template, [
        'manu-item-name',
        'manu-item-line',
        'remove-line',
        'push-back-line',
    ]);
    const item = item_data[item_id];

    current_cost.add(item.cost);

    template_elements['manu-item-name'].textContent = item.name;
    template_elements['remove-line'].addEventListener('click', () => {
        // [TODO]: Create feedback for clicks
        const type = item.type;
        const row = configured_items[type];

        crate_crafted -= 4;
        current_cost.subtract(item.cost);

        for (const entry of row) {
            if (entry.id !== item_id) continue;

            entry.crafted_amount -= 4;
        }

        template_elements['manu-item-line'].remove();
        manu_registry.stat_label.cost_to_craft.textContent =
            current_cost.to_string();

        refresh_buttons();
    });
    template_elements['push-back-line'].addEventListener('click', () => {
        queued_items.push(item_id);
        current_cost.subtract(item.cost);

        template_elements['manu-item-line'].remove();
        manu_registry.stat_label.cost_to_craft.textContent =
            current_cost.to_string();
    });

    manu_registry.stat_label.item_to_craft.appendChild(template.content);
    manu_registry.stat_label.cost_to_craft.textContent =
        current_cost.to_string();
    crate_crafted += 4;
}

function is_queue_empty(item_type: ItemType): boolean {
    const item_row = configured_items[item_type];

    if (item_row.length === 0) return true;

    if (
        item_row[item_row.length - 1].amount ===
        item_row[item_row.length - 1].crafted_amount
    )
        return true;

    return false;
}

/**
 * Refresh the state of the buttons.
 *
 * All button used to add queue become inactive if all item of that type reaches the manu goal.
 *
 * The submit button become inactive if there are nothing to submit. (main queue empty)
 */
function refresh_buttons() {
    if (manu_registry.stat_label.item_to_craft.innerHTML === '') {
        manu_registry.control.submit_button.setAttribute(
            'disabled',
            'disabled'
        );
    } else {
        manu_registry.control.submit_button.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.LIGHT_ARM)) {
        manu_registry.control.light_arm.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.light_arm.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.HEAVY_ARM)) {
        manu_registry.control.heavy_arm.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.heavy_arm.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.HEAVY_SHELL)) {
        manu_registry.control.heavy_shell.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.heavy_shell.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.MEDICAL)) {
        manu_registry.control.medical.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.medical.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.UTILITIES)) {
        manu_registry.control.utilities.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.utilities.removeAttribute('disabled');
    }

    if (is_queue_empty(ItemType.UNIFORM)) {
        manu_registry.control.uniform.setAttribute('disabled', 'disabled');
    } else {
        manu_registry.control.uniform.removeAttribute('disabled');
    }
}

export namespace ManuScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        manu_registry = DomRegistry.get_manu_registry();
        current_cost = new Cost();

        manu_registry.control.light_arm.addEventListener('click', () => {
            add_queue(ItemType.LIGHT_ARM);
        });
        manu_registry.control.heavy_arm.addEventListener('click', () => {
            add_queue(ItemType.HEAVY_ARM);
        });
        manu_registry.control.heavy_shell.addEventListener('click', () => {
            add_queue(ItemType.HEAVY_SHELL);
        });
        manu_registry.control.utilities.addEventListener('click', () => {
            add_queue(ItemType.UTILITIES);
        });
        manu_registry.control.medical.addEventListener('click', () => {
            add_queue(ItemType.MEDICAL);
        });
        manu_registry.control.uniform.addEventListener('click', () => {
            add_queue(ItemType.UNIFORM);
        });
        manu_registry.control.submit_button.addEventListener(
            'click',
            submitItems
        );

        manu_registry.stop_manu_button.addEventListener('click', () => {
            StatScreen.update_manu_stat(start_time, configured_items);
            ResultScreen.show(
                configured_items,
                manu_registry.stat_label.time_spent.innerText
            );
            clearInterval(time_ref);
            manu_registry.stop_manu_button.className = 'hidden';
            manu_registry.root_element.className = 'hidden';
        });
    }

    /**
     * Switch the screen to manu screen.
     *
     * @param data The to-manu list
     */
    export function start(data: Item[][]) {
        configured_items = data;
        crate_crafted = 0;

        DomRegistry.get_title().innerText = 'Manu';

        // Round all crate count to multiple of four.
        for (const row of configured_items) {
            for (const item of row) {
                item.amount = Math.ceil(item.amount / 4) * 4;
            }
        }

        queued_items = [];

        start_time = Date.now();
        time_ref = setInterval(() => {
            // create a timer that track how much time has passed since manu start
            const current_time = Date.now();
            manu_registry.stat_label.time_spent.innerText = duration_to_string(
                current_time - start_time
            );
        }, 1000);

        current_cost.reset();

        manu_registry.stat_label.cost_to_craft.innerText =
            current_cost.to_string();
        manu_registry.stat_label.crate_crafted.innerText = '0';

        refresh_buttons();

        manu_registry.stop_manu_button.className = 'accent';
        manu_registry.root_element.className = '';
    }
}
