"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OnceModel = void 0;
var dotenv = require("dotenv");
var node_fetch_1 = require("node-fetch");
var env = dotenv.config({ path: './.env' });
var OnceModel = /** @class */ (function () {
    function OnceModel(username, password) {
        var _a, _b;
        this.username = username;
        this.password = password;
        this.endpoint = 'https://api.1nce.com/management-api/';
        var _username = username || ((_a = env.parsed) === null || _a === void 0 ? void 0 : _a.USERNAME) || '';
        var _password = password || ((_b = env.parsed) === null || _b === void 0 ? void 0 : _b.PASSWORD) || '';
        this.authentication = 'Basic ' + Buffer.from("".concat(_username, ":").concat(_password).trim()).toString('base64');
    }
    OnceModel.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.endpoint + 'oauth/token';
                        options = {
                            method: 'POST',
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                authorization: this.authentication
                            },
                            body: JSON.stringify({ grant_type: 'client_credentials' })
                        };
                        return [4 /*yield*/, (0, node_fetch_1["default"])(url, options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json.status_code !== 200) {
                            this.token = undefined;
                            this.tokenExpiration = undefined;
                            throw new Error('Failed to get token');
                        }
                        this.token = json.access_token;
                        this.tokenExpiration = new Date(Date.now() + json.expires_in * 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    OnceModel.prototype.checkToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.token || !this.tokenExpiration || this.tokenExpiration < new Date())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    OnceModel.prototype.getSimDataQuota = function (iccid) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkToken()];
                    case 1:
                        _a.sent();
                        url = this.endpoint + "v1/sims/".concat(iccid, "/quota/data");
                        options = {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                authorization: 'Bearer ' + this.token
                            }
                        };
                        return [4 /*yield*/, (0, node_fetch_1["default"])(url, options)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OnceModel.prototype.getSimUsage = function (iccid, start_dt, end_dt) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkToken()];
                    case 1:
                        _a.sent();
                        url = this.endpoint + "v1/sims/".concat(iccid, "/usage").concat(start_dt ? "?start_dt=".concat(start_dt) : '').concat(end_dt ? "&end_dt=".concat(end_dt) : '');
                        options = {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                authorization: 'Bearer ' + this.token
                            }
                        };
                        return [4 /*yield*/, (0, node_fetch_1["default"])(url, options)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OnceModel;
}());
exports.OnceModel = OnceModel;
