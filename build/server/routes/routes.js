"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationToken_1 = require("../authenticationToken");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
let router = express_1.default.Router();
router.get('/', authenticationToken_1.authentication);
/* router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: token })
    next()
}) */
router.get('/', (req, res, next) => {
    let bearer = authenticationToken_1.token.tokenType;
    let accessToken = authenticationToken_1.token.accessToken;
    axios_1.default.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=ols&format=json', {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })
        .then(function (response) {
        res.status(200).json({ response: response.data });
        console.log(response.data);
    }).catch(function (error) {
        console.log("ERROR: ", error);
    }).then(next);
});
exports.default = router;
