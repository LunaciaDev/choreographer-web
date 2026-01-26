import { item_data } from '../data/item-data';
import { get_template_elements } from '../helper';
import type { Item } from '../types/item';
import { ConfigScreen } from './config-screen';
import { DomRegistry, type ResultRegistry } from './dom-registry';

let result_registry: ResultRegistry;

export namespace ResultScreen {
    /**
     * Initialize the component.
     *
     * Must be called on DOM initialization, otherwise calls might fail.
     */
    export function init() {
        result_registry = DomRegistry.get_result_registry();

        result_registry.return_button.addEventListener('click', () => {
            result_registry.root_element.className = 'hidden';
            ConfigScreen.start();
        });
    }

    /**
     * Switch to the result screen.
     *
     * @param queued_item The to-manu list
     * @param time Time spent manuing
     */
    export function show(queued_item: Item[][], time: string) {
        result_registry.item_crafted.innerHTML = '';
        result_registry.time_spent.innerText = time;
        result_registry.root_element.className = '';
        DomRegistry.get_title().innerText = 'Result';

        let amount_crafted = 0;

        for (let row_index = 0; row_index < queued_item.length; row_index++) {
            const row = queued_item[row_index];

            for (let index = 0; index < row.length; index++) {
                const item = row[index];

                if (item.crafted_amount === 0) continue;

                amount_crafted += item.crafted_amount;
                add_line(item.id, item.crafted_amount);

                if (item.amount === item.crafted_amount) {
                    row.splice(index, 1);
                }

                item.amount -= item.crafted_amount;
                item.crafted_amount = 0;
            }
        }

        result_registry.crate_crafted.innerText = amount_crafted.toString();

        function add_line(item_id: number, amount: number) {
            const item = item_data[item_id];
            if (item === undefined) return;

            const template = result_registry.item_card_template.cloneNode(
                true
            ) as HTMLTemplateElement;
            const templateElements = get_template_elements(template, [
                'item-name',
                'item-amount',
            ]);

            templateElements['item-name'].innerText = item.name;
            templateElements['item-amount'].innerHTML = amount.toString();

            result_registry.item_crafted.appendChild(template.content);
        }
    }
}
