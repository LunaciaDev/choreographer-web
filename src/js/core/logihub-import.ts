import { DomRegistry_getConfigView } from '../data/dom-registry';
import { itemData } from '../data/item-data';
import { Priority_stringToPriority } from '../types/priority';
import { ChoreoConfig_addItem } from './choreo-config';

let logihubInput: HTMLTextAreaElement;

type LoghubItem = {
    name: string;
    amount: number;
    priority: string;
};

/**
 * Convert the Logihub export JSON to internal data.
 *
 * The export is already roughly what we wanted, except the name.
 * So we need to translate the name to what we use.
 */
function importLogihub() {
    const rawData = logihubInput.value;
    if (rawData === null) return;

    try {
        const items = JSON.parse(rawData) as LoghubItem[];

        for (const item of items) {
            const id = translateLogihubToInternal(item.name);
            const priority = Priority_stringToPriority(item.priority);

            ChoreoConfig_addItem(id, priority, item.amount);
        }

        logihubInput.value = '';
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

/**
 * Translate Logihub item name to internal name used in the app.
 *
 * Throws an Error if we cannot find an item with that name.
 *
 * @param name
 * @returns The internal name of the item
 */
function translateLogihubToInternal(name: string): string {
    for (const [key, item] of itemData) {
        if (item.logihubName === name) {
            return key;
        }

        if (item.name === name) {
            return key;
        }
    }

    throw new Error(`Failed to translate ${name} to internal id`);
}

/**
 * Initialize the component.
 *
 * Must be called on DOM initialization, otherwise calls might fail.
 */
export function LogihubImport_init() {
    const logihub = DomRegistry_getConfigView().logihubInput;
    logihubInput = logihub.input;
    logihub.submitButton.addEventListener('click', importLogihub);
}
