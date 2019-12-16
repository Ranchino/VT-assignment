"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationToken_1 = require("../authenticationToken");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
let router = express_1.default.Router();
router.get('/', authenticationToken_1.authentication);
/* router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: token })
    next()
}) */
router.get('/', (req, res, next) => {
    let bearer = authenticationToken_1.token.tokenType;
    let accessToken = authenticationToken_1.token.accessToken;
    axios_1.default.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json', {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })
        .then(function (response) {
        res.status(200).json(response.data);
        console.log(response.data);
        fs_1.default.readFile('./All_stops.json', 'utf-8', function (err, data) {
            if (err)
                throw err;
            var arrayOfObjects = JSON.parse(data);
            arrayOfObjects.All_Stops.push(response.data.LocationList);
            fs_1.default.writeFile('./All_stops.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                if (err)
                    throw err;
                console.log("done");
            });
        });
    }).catch(function (error) {
        console.log("ERROR: ", error);
    }).then(next);
});
exports.default = router;
