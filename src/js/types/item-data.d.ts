import { ItemType } from './item-type';

export type ItemData = {
    name: string;
    logihub_name?: string;
    type: ItemType;
    cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    };
};
