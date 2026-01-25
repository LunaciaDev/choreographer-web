/**
 * When using template, we need to clone and get references
 * of various classes inside in order to write specific data
 * Which require constantly checking for whether if that
 * element query is null or not.
 *
 * This helper automatically do that, throw if any specified
 * classes cannot be found.
 *
 * The helper use generic, because for some reason Intellisense
 * generate hint for the class name when using generic.
 *
 * @example
 * const itemCardElemsRef = getNodeOrThrow(itemCardRef, ['item-name', 'item-amount', 'item-cost']);
 * // get a reference
 * itemCardElemsRef['item-name']
 *
 * @param root The root element to search from
 * @param class_names A list of class names, not prefixed
 * @returns A Record holding reference to the first instance
 * of the class found.
 */
export function get_template_elements<T extends string>(
    root: HTMLTemplateElement,
    class_names: T[]
): Record<T, HTMLElement> {
    const nodes = {} as Record<T, HTMLElement>;

    for (const class_name of class_names) {
        const node = root.content.querySelector(`.${class_name}`);

        if (!node) {
            throw new Error(`Cannot find class ${class_name}`);
        }

        nodes[class_name] = node as HTMLElement;
    }

    return nodes;
}
