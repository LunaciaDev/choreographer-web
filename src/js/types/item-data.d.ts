import { ItemType } from './item-type';

export type ItemData = {
    name: string;
    logihubName?: string;
    type: ItemType;
    cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    };
};
