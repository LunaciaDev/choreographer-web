import { itemData } from './data/item-data';

/**
 * When using template, we need to clone and get references
 * of various classes inside in order to write specific data
 * Which require constantly checking for whether if that
 * element query is null or not.
 *
 * This helper automatically do that, throw if any specified
 * classes cannot be found.
 *
 * @example
 * const itemCardElemsRef = getNodeOrThrow(itemCardRef, ['item-name', 'item-amount', 'item-cost']);
 * // get a reference
 * itemCardElemsRef['item-name']
 *
 * @param root The root element to search from
 * @param rootName The name of the root element, for debugging.
 * @param classNames A list of class names, not prefixed
 * @returns A Record holding reference to the first instance
 * of the class found.
 */
export function getTemplateChildOrThrow<T extends string>(
    root: HTMLTemplateElement,
    rootName: string,
    classNames: T[]
): Record<T, HTMLElement> {
    const nodes = {} as Record<T, HTMLElement>;

    for (const className of classNames) {
        const node = root.content.querySelector(`.${className}`);

        if (!node) {
            throw new Error(`In ${rootName}, cannot find class ${className}`);
        }

        nodes[className] = node as HTMLElement;
    }

    return nodes;
}

/**
 * Given an ItemID, generate a human-readable string of
 * the build cost for that item.
 *
 * Cost is calculated per crate.
 *
 * @param itemID
 * @returns A human-readable string representing the build cost
 */
export function generateCostString(itemID: number): string {
    const item = itemData[itemID];
    const component: string[] = [];

    if (item.cost.bmat !== 0) {
        component.push(`${item.cost.bmat}b`);
    }

    if (item.cost.emat !== 0) {
        component.push(`${item.cost.emat}e`);
    }

    if (item.cost.rmat !== 0) {
        component.push(`${item.cost.rmat}r`);
    }

    if (item.cost.hemat !== 0) {
        component.push(`${item.cost.hemat}he`);
    }

    return component.join(', ');
}
