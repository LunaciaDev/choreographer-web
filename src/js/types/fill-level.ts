export enum FillLevel {
    CRITICAL,
    CUSTOM,
    LOW,
    OK,
}

export namespace FillLevel {
    /**
     * Get the iterator of the enum
     *
     * @returns Array of keys of the enum
     */
    export function get_iterator(): FillLevel[] {
        return Object.values(FillLevel).filter(
            (v) => typeof v === 'number'
        ) as FillLevel[];
    }

    export function to_string(fill_level: FillLevel): string {
        switch (fill_level) {
            case FillLevel.CRITICAL:
                return 'Critical';
            case FillLevel.CUSTOM:
                return 'User';
            case FillLevel.LOW:
                return 'Low';
            case FillLevel.OK:
                return 'Okay-ish';
        }
    }
}
