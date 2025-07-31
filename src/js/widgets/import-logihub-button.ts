import { translateLogihubToInternal } from '../helper';
import { Priority_stringToPriority } from '../types/priority';
import { addItemCard } from './item-card';

export function importLogihub() {
    const input = document.getElementById(
        'logihub-import-paste'
    ) as HTMLTextAreaElement;

    if (input === null) {
        throw new Error('Cannot find logihub-import-paste');
    }

    const items = JSON.parse(input.value) as LogihubItem[];

    items.forEach((item) => {
        addItemCard(
            translateLogihubToInternal(item.name),
            item.amount,
            Priority_stringToPriority(item.priority)
        );
    });

    input.value = '';
}

type LogihubItem = {
    name: string;
    amount: number;
    priority: string;
};
