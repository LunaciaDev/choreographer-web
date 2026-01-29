import { item_data } from '../data/item-data';
import type { ConfigData } from './config-data';
import { FillLevel } from './fill-level';
import type { Item } from './item';
import { Cost } from './item-cost';
import { ItemType } from './item-type';

export class ManuData {
    data: Item[][] = [];
    manu_index: number[] = [];

    crate_staged: number = 0;
    queued_item: number[] = [];
    current_cost: Cost = new Cost();
    crate_crafted: number = 0;
    start_time: number = 0;

    start_manu(config_data: ConfigData) {
        this.data = ItemType.get_iterator().map(() => []);
        this.manu_index = ItemType.get_iterator().map(() => 0);

        for (const fill_level of FillLevel.get_iterator()) {
            config_data
                .get_data(fill_level)
                .map((item) => {
                    item.amount = Math.ceil(item.amount / 4) * 4;
                    return item;
                })
                .forEach((item) =>
                    this.data[item_data[item.id].type].push(item)
                );
        }

        this.current_cost.reset();
        this.crate_crafted = 0;
        this.queued_item = [];
        this.crate_staged = 0;
    }

    add_queue(item_type: ItemType): number | null {
        let current_index = this.manu_index[item_type];

        if (current_index >= this.data[item_type].length) {
            return null;
        }

        const item_id = this.data[item_type][current_index].id;
        this.data[item_type][current_index].crafted_amount += 4;

        // update index
        while (
            this.data[item_type][current_index].crafted_amount >=
            this.data[item_type][current_index].amount
        ) {
            current_index++;
        }

        this.manu_index[item_type] = current_index;

        // if the total cost require more than 13 slots, move to queue.
        if (
            this.current_cost.get_theoretical_cost_in_slots(
                item_data[item_id].cost
            ) > 13
        ) {
            this.queued_item.push(item_id);
            return null;
        }

        this.current_cost.add(item_data[item_id].cost);
        this.crate_staged += 4;
        return item_id;
    }

    submit_items(): number[] {
        const result: number[] = [];

        this.current_cost.reset();
        this.crate_crafted += this.crate_staged;
        this.crate_staged = 0;

        this.queued_item = this.queued_item
            .map((item_id) => {
                if (
                    this.current_cost.get_theoretical_cost_in_slots(
                        item_data[item_id].cost
                    ) <= 13
                ) {
                    result.push(item_id);
                    this.current_cost.add(item_data[item_id].cost);
                    this.crate_staged += 4;
                    return -1;
                }

                return item_id;
            })
            .filter((value) => value != -1);

        return result;
    }

    put_back_item(id: number) {
        this.current_cost.subtract(item_data[id].cost);
        this.crate_staged -= 4;

        const item_type = item_data[id].type;

        let current_index = this.manu_index[item_data[id].type];
        while (current_index >= 0) {
            if (this.data[item_type][current_index].id != id) {
                current_index -= 1;
            }

            break;
        }

        this.data[item_type][current_index].crafted_amount -= 4;
        this.manu_index[item_type] = current_index;
    }

    is_queue_empty(item_type: ItemType): boolean {
        return this.manu_index[item_type] >= this.data[item_type].length;
    }
}
