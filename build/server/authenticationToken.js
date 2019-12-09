"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let accessToken;
let clientId = "koe5BYE1jhJC4vsE6dzJDAX0zfUa";
let clientSecret = "BwdHUCabftDUfga6dOf1Bd8NW5oa";
let grantType = 'client_credentials';
let URL = 'https://api.vasttrafik.se/token';
function authentication() {
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;
    axios_1.default.post(URL, data, {
        headers
    })
        .then(function (response) {
        console.log("SUCCESS: ", response.data);
    }).catch(function (error) {
        console.log("ERROR: ", error);
    });
}
exports.authentication = authentication;
