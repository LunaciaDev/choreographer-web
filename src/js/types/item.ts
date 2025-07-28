export type Item = {
    name: string;
    type: ItemType;
    cost: {
        bmat: number;
        emat: number;
        rmat: number;
        hemat: number;
    };
};

/**
 * Enumeration of all possible item types.
 */
export enum ItemType {
    LIGHT_ARM = 'Light Arm',
    HEAVY_ARM = 'Heavy Arm',
    HEAVY_SHELL = 'Heavy Shell',
    MEDICAL = 'Medical',
    UTILITIES = 'Utilities',
    UNIFORM = 'Uniform',
}
