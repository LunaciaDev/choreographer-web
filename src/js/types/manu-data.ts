import { item_data } from '../data/item-data';
import type { ConfigData } from './config-data';
import { FillLevel } from './fill-level';
import type { Item } from './item';
import { ItemType } from './item-type';

export class ManuData {
    data: Item[][] = [];

    constructor(config_data: ConfigData) {
        for (const _ of ItemType.get_iterator()) {
            this.data.push([]);
        }

        for (const fill_level of FillLevel.get_iterator()) {
            const level_data = config_data.get_data(fill_level);

            for (const item of level_data) {
                this.data[item_data[item.id].type].push(item);
            }
        }
    }

    get_data(): Item[][] {
        return this.data;
    }
}
