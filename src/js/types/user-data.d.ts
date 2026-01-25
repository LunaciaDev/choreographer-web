import type { Cost } from './item-cost';

export type UserData = {
    crate_crafted: number;
    material_consumed: Cost;
    item_crafted: ItemCraftedEntry[];
    time_spent: number;
};

export type ItemCraftedEntry = {
    id: string;
    amount: number;
};
