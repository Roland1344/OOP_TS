type BaseOp = "sum" | "multiplier" | "mode" | "print";

class Numberseries {
    //Attributumok, tulajdonságok (osztály változói (rejtettek-private))
    private _count: number; // Hány szám legyen a listában. 
    private _v: number // A generált számok felső határa.
    private _list: number[] // Ebben tároljuk a számokat.

    // Konstruktor - létrehozza az objektumokat: inicializálja az attributumokat:
    constructor(
        count: number,
        v: number,
        rng: (max: number) => number // TODO
    ) {
        if (count <= 0) throw new Error("Számosság pozitív egész legyen!");
        if (v <= 0) throw new Error("A felső határ pozitív egész legyen!");

        this._count = count;
        this._v = v;
        this._list = Array.from({ length: count }, () => rng(v));
    }

    // Values property: get/set accesztorokkkal (elérőkkel):
    // Getter:
    get values(): readonly number[] {
        return this._list;
    }

    // Szetter: kontrolláltan adok értéket a propertynek
    set values(arr: number[]) {
        if (arr.length === 0) throw new Error("Nem lehet üres a lista!");
        if (!arr.every(n => Number.isFinite(n) && n > 0)) throw new Error("Minden elem pozitív egész legyen!");

        this._list = [...arr]; // A lista elemeinek a másolata kerül a _list-be! Ez egy új array lesz.
        this._count = arr.length;
        this._v = Math.max(...arr);
    }
    // Csak olvasható property-k:
    get count(): number { return this._count };
    get v(): number { return this._v };

    // Objektum metódusok: 
    mode(): number {
        const statistic: Record<number, number> = {};
        for (let n of this._list) {
            statistic[n] = (statistic[n] ?? 0) + 1;
        }

        let best = this._list[0];
        for (const k of Object.keys(statistic)) {
            const key = Number(k);
            if (statistic[key]! > statistic[best!]!) {
                best = key;
            }
        }
        return best!;
    }
    sum() { return this._list.reduce((acc, n) => acc + n, 0) }
    multiplier() { return this._list.reduce((acc, n) => acc * n, 1) }
    // Router (switch-case): sum, multiplier, mode, print
    run(op: BaseOp) {
        switch (op) {
            case "sum":
                console.log(`Összeg: ${this.sum()}`);
                break;
            case "multiplier":
                console.log(`Szorzat: ${this.multiplier()}`);;
                break;
            case "mode":
                console.log(`Leggyakoribb...${this.mode()}`);
                break;
            case "print":
                console.log("Kiírás:", this.values.join(", ")); 
                break;
            default:
                console.log("Helytelen művelet!");
                break;
        }
    }

    // Statikus metódusok:
    static help(): void{
        console.log("Elérhető műveletek: sum, multiplier, mode, print");
    }

    static rand(max: number): number {
        return Math.floor(Math.random()* max) +1;
    }
}