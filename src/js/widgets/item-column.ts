import { getTemplateChildOrThrow } from '../helper';

/**
 * Create a column HTML node with a title.
 *
 * @param itemType Title of the column
 * @returns A HTML Node of the created column
 * @author LunaciaDev
 */
export function createItemColumn(itemType: string): HTMLTemplateElement {
    const itemColTemplate = dataStore.templateReference.itemColumn.cloneNode(
        true
    ) as HTMLTemplateElement;
    const itemColClassName = ['item-column-label'];
    const itemColRefs = getTemplateChildOrThrow(
        itemColTemplate,
        'item-column-template',
        itemColClassName
    );

    itemColRefs['item-column-label'].innerText = itemType;

    return itemColTemplate;
}
