import { item_data } from '../data/item-data';
import { Priority } from '../types/priority';
import { ConfigScreen } from './config-screen';
import { DomRegistry } from './dom-registry';

let logihub_input: HTMLTextAreaElement;

type LoghubItem = {
    name: string;
    amount: number;
    priority: string;
};

/**
 * Translate Logihub item name to internal name used in the app.
 *
 * Throws an Error if we cannot find an item with that name.
 *
 * @param name
 * @returns The internal name of the item
 */
function to_internal(name: string): string {
    for (const [key, item] of item_data) {
        if (item.logihub_name === name) {
            return key;
        }

        if (item.name === name) {
            return key;
        }
    }

    throw new Error(`Failed to translate ${name} to internal id`);
}

export namespace LogihubImporter {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        const logihub_registry =
            DomRegistry.get_config_registry().logihub_input;
        logihub_input = logihub_registry.input;
        logihub_registry.submit_button.addEventListener('click', import_items);
    }

    /**
     * Convert the Logihub export JSON to internal data.
     *
     * The export is already roughly what we wanted, except the name.
     * So we need to translate the name to what we use.
     */
    export function import_items() {
        const raw_data = logihub_input.value;
        if (raw_data === null) return;

        try {
            const items = JSON.parse(raw_data) as LoghubItem[];

            for (const item of items) {
                const id = to_internal(item.name);
                const priority = Priority.to_priority(item.priority);

                ConfigScreen.add_item(id, priority, item.amount);
            }

            logihub_input.value = '';
        } catch (e) {
            if (e instanceof SyntaxError) {
                // [TODO]: Show something in the UI.
                // This exception is for failed JSON parsing.
                return;
            } else {
                throw e;
            }
        }
    }
}
