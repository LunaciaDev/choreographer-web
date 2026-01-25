import type { Priority } from './priority';

export type Item = {
    id: string;
    amount: number;
    crafted_amount: number;
    priority: Priority;
};
