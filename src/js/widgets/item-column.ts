export function createItemColumn(itemType: string): Node {
    const column = document.createElement('div');
    const columnLabel = document.createElement('div');

    columnLabel.innerHTML = itemType;

    column.appendChild(columnLabel);

    return column;
}
