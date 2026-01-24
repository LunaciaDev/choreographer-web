import type { Cost } from './item-cost';

export type UserData = {
    crateCreated: number;
    materialConsumed: Cost;
    itemCrafted: ItemCraftedEntry[];
    timeSpent: number;
};

export type ItemCraftedEntry = {
    id: string;
    amount: number;
};
