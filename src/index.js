"use strict";
exports.__esModule = true;
var once_model_js_1 = require("./once.model.js");
var once = new once_model_js_1.OnceModel();
// once.getSimDataQuota('8988228066602891665').then(console.log);
// once.getSimUsage('8988228066602891665').then(console.log);
// once.getSimDataQuota('8988228066601885210').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimDataQuota('8988228066602891665').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimDataQuota('8988228066602361533').then(x => console.log(JSON.stringify(x, null, 2)));
once.getSimDataQuota('8988228066602361533').then(function (x) { return console.log(JSON.stringify(x, null, 2)); });
// once.getSimDataQuota('8988228066602362032').then(x => console.log(JSON.stringify(x, null, 2)));
// once.getSimUsage('8988228066602373946', '2022-03-22', '2022-05-22').then(x => console.log(JSON.stringify(x, null, 2)));
