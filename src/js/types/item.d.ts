import type { Priority } from './priority';

export type Item = {
    id: number;
    amount: number;
    craftedAmount: number;
    priority: Priority;
};
