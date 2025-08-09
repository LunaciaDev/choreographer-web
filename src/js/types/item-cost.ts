export class Cost {
    bmat: number;
    emat: number;
    hemat: number;
    rmat: number;

    constructor() {
        this.bmat = 0;
        this.emat = 0;
        this.hemat = 0;
        this.rmat = 0;
    }

    add(cost: { bmat: number; emat: number; hemat: number; rmat: number }) {
        this.bmat += cost.bmat * 4;
        this.emat += cost.emat * 4;
        this.hemat += cost.hemat * 4;
        this.rmat += cost.rmat * 4;
    }

    subtract(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }) {
        this.bmat -= cost.bmat * 4;
        this.emat -= cost.emat * 4;
        this.hemat -= cost.hemat * 4;
        this.rmat -= cost.rmat * 4;
    }

    reset() {
        this.bmat = 0;
        this.emat = 0;
        this.hemat = 0;
        this.rmat = 0;
    }

    getCurrentSlotCost(): number {
        return (
            Math.ceil(this.bmat / 100) +
            Math.ceil(this.emat / 100) +
            Math.ceil(this.rmat / 100) +
            Math.ceil(this.hemat / 100)
        );
    }

    getTheoreticalSlotCost(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }): number {
        return (
            Math.ceil((this.bmat + cost.bmat * 4) / 100) +
            Math.ceil((this.emat + cost.emat * 4) / 100) +
            Math.ceil((this.rmat + cost.rmat * 4) / 100) +
            Math.ceil((this.hemat + cost.hemat * 4) / 100)
        );
    }

    toString(): string {
        const component: string[] = [];

        component.push(`${this.bmat}b`);

        if (this.emat !== 0) {
            component.push(`${this.emat}e`);
        }

        if (this.rmat !== 0) {
            component.push(`${this.rmat}r`);
        }

        if (this.hemat !== 0) {
            component.push(`${this.hemat}he`);
        }

        return component.join(', ');
    }

    static makeCostString(cost: {
        bmat: number;
        emat: number;
        hemat: number;
        rmat: number;
    }) {
        const component: string[] = [];

        if (cost.bmat !== 0) {
            component.push(`${cost.bmat}b`);
        }

        if (cost.emat !== 0) {
            component.push(`${cost.emat}e`);
        }

        if (cost.rmat !== 0) {
            component.push(`${cost.rmat}r`);
        }

        if (cost.hemat !== 0) {
            component.push(`${cost.hemat}he`);
        }

        return component.join(', ');
    }
}
