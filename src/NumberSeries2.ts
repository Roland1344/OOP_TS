import { Numberseries, type BaseOp } from "./NumberSeries.js";

export class Numberseries2 extends Numberseries {

    constructor(count: number, v: number){
        super(count, v);
        

    }
    div() {
        return this._list[0];
    }


    override mode(): number {
        const statistic: Record<number, number> = {};
        for (let n of this._list) {
            statistic[n] = (statistic[n] ?? 0) + 1;
        }

        let best = this._list[0];
        for (const k of Object.keys(statistic)) {
            const key = Number(k);
            if (statistic[key]! < statistic[best!]!) {
                best = key;
            }
        }
        return best!;
    }
}