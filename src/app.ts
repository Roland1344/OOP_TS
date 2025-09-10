import { Numberseries, type BaseOp } from "./NumberSeries.js";
import { Numberseries2 } from "./NumberSeries2.js";

// Statikus metódusok (Osztályhoz tartozóak):
Numberseries.help();
console.log(Numberseries.rand(8));

//Példányosítás:
const n = new Numberseries(30, 8);
console.log(n.run("print"));
console.log(n.values);
n.values = [100, 100, 100, 100, 1, 2, 3];
console.log(n.run("print"));
n.values = [3, 10];
console.log(n.run("print"));

console.log("************************************");
const s = new Numberseries2(10, 4);
console.log(s.run("print"));
console.log(s.div());
console.log();