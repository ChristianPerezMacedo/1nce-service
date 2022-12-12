import { OnceModel } from "./once.model.js";

const once = new OnceModel();

// once.getSimDataQuota('8988228066602891665').then(console.log);
// once.getSimUsage('8988228066602891665').then(console.log);
// once.getSimDataQuota('8988228066601885210').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimDataQuota('8988228066602891665').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimDataQuota('8988228066602361533').then(x => console.log(JSON.stringify(x, null, 2)));
once.getSimDataQuota('8988228066602361533').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimDataQuota('8988228066602362032').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimUsage('8988228066602373946', '2022-03-22', '2022-05-22').then(x => console.log(JSON.stringify(x, null, 2)));