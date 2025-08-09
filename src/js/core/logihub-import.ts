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
    } catch (e) {
        if (e instanceof SyntaxError) {
            // [TODO]: Show something in the UI.
            // This exception is for failed JSON parsing.
            return;
        } else {
            throw e;
        }
    } finally {
        logihubInput.value = '';
    }
}

function translateLogihubToInternal(name: string): number {
    for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].logihubName !== undefined) {
            if (itemData[i].logihubName == name) {
                return i;
            }
        }

        if (itemData[i].name === name) {
            return i;
        }
    }

    throw new Error(`Failed to translate ${name} to internal id`);
}

export function LogihubImport_init() {
    const logihub = DomRegistry_getConfigView().logihubInput;
    logihubInput = logihub.input;
    logihub.submitButton.addEventListener('click', importLogihub);
}
