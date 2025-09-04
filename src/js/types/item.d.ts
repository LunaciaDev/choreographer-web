import type { Priority } from './priority';

export type Item = {
    id: string;
    amount: number;
    craftedAmount: number;
    priority: Priority;
};
