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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let clientId = "koe5BYE1jhJC4vsE6dzJDAX0zfUa";
let clientSecret = "BwdHUCabftDUfga6dOf1Bd8NW5oa";
let grantType = 'client_credentials';
let URL = 'https://api.vasttrafik.se/token';
let expireTime;
function authentication(Request, Response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;
        yield axios_1.default.post(URL, data, {
            headers
        })
            .then(function (response) {
            expireTime = response.data.expires_in;
            exports.token = {
                accessToken: response.data.access_token,
                expireTime: response.data.expires_in,
                tokenType: response.data.token_type
            };
        }).catch(function (error) {
            console.log("ERROR: ", error);
        }).finally(next);
    });
}
exports.authentication = authentication;
