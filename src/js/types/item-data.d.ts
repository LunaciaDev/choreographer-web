import { ItemType } from './item-type';

export type ItemData = {
    name: string;
    type: ItemType;
    cost: {
        bmat: number;
        emat: number;
        rmat: number;
        hemat: number;
    };
};
