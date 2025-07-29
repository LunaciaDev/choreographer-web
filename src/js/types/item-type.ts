/**
 * Enumeration of all possible item types.
 */
export enum ItemType {
    LIGHT_ARM,
    HEAVY_ARM,
    HEAVY_SHELL,
    MEDICAL,
    UTILITIES,
    UNIFORM,
}

/**
 * Convert the enum to the corresponding string value
 *
 * @param type
 * @returns String value of that type
 */
export function ItemType_getLabel(type: ItemType): string {
    switch (type) {
        case ItemType.LIGHT_ARM:
            return 'Light Arm';
        case ItemType.HEAVY_ARM:
            return 'Heavy Arm';
        case ItemType.HEAVY_SHELL:
            return 'Heavy Shell';
        case ItemType.MEDICAL:
            return 'Medical';
        case ItemType.UTILITIES:
            return 'Utilities';
        case ItemType.UNIFORM:
            return 'Uniform';
    }
}

/**
 * Get the iterator of the enum
 *
 * @returns Array of keys of the enum
 */
export function ItemType_getIterator(): ItemType[] {
    return Object.values(ItemType).filter(
        (v) => typeof v === 'number'
    ) as ItemType[];
}
