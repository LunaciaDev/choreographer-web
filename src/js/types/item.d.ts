import type { FillLevel } from './fill-level';
import type { Priority } from './priority';

export type Item = {
    id: number;
    amount: number;
    crafted_amount: number;
    priority: Priority;
    fill_level: FillLevel;
};
