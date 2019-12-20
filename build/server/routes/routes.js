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
const authenticationToken_1 = require("../authenticationToken");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
let router = express_1.default.Router();
var origin;
var destination;
router.use('/', authenticationToken_1.authentication);
router.get('/', (req, res, next) => {
    let bearer = authenticationToken_1.token.tokenType;
    let accessToken = authenticationToken_1.token.accessToken;
    axios_1.default.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json', {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })
        .then(function (response) {
        fs_1.default.readFile('./All_stops.json', 'utf-8', function (err, data) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                var arrayOfObjects = JSON.parse(data);
                arrayOfObjects.All_Stops = [];
                arrayOfObjects.All_Stops.push(response.data.LocationList);
                fs_1.default.writeFile('./All_stops.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                    if (err)
                        throw err;
                    console.log("done");
                });
            });
        });
    }).catch(function (error) {
        console.log("ERROR: ", error);
    }).then(next);
});
router.post('/location', (req, res, next) => {
    let array = [];
    let searchResults;
    // Resets array for every input liste
    array = [];
    fs_1.default.readFile('./All_stops.json', 'utf-8', function (err, data) {
        var arrayOfObjects = JSON.parse(data);
        let allStopsList = arrayOfObjects.All_Stops[0].StopLocation;
        for (var i = 0; i < allStopsList.length; i++) {
            if (allStopsList[i].name.includes(req.body.searchValue) && allStopsList[i].track === undefined) {
                searchResults = {
                    'hallplats': arrayOfObjects.All_Stops[0].StopLocation[i].name,
                    'id': arrayOfObjects.All_Stops[0].StopLocation[i].id
                };
                array.push(searchResults);
                if (array.length === 10) {
                    break;
                }
            }
        }
        res.send(array);
    });
});
router.post('/getTrips', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let url;
        let busRoutes = [];
        busRoutes = [];
        if (req.body.searchForArrival) {
            url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&searchForArrival=${req.body.searchForArrival}&numTrips=4&format=json`;
        }
        else {
            url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&numTrips=4&format=json`;
        }
        let bearer = authenticationToken_1.token.tokenType;
        let accessToken = authenticationToken_1.token.accessToken;
        let tripsAPI = yield axios_1.default.get(url, {
            headers: {
                Authorization: bearer + " " + accessToken
            }
        });
        busRoutes.push(tripsAPI.data.TripList.Trip);
        var uri;
        let hasArray = tripsAPI.data.TripList.Trip[0].Leg;
        if (Array.isArray(hasArray)) {
            console.log("har array");
            uri = tripsAPI.data.TripList.Trip[0].Leg[0].JourneyDetailRef.ref;
            origin = tripsAPI.data.TripList.Trip[0].Leg[0].Origin.routeIdx;
            destination = tripsAPI.data.TripList.Trip[0].Leg[0].Destination.routeIdx;
        }
        else {
            console.log("har inte array");
            uri = tripsAPI.data.TripList.Trip[0].Leg.JourneyDetailRef.ref;
            origin = tripsAPI.data.TripList.Trip[0].Leg.Origin.routeIdx;
            destination = tripsAPI.data.TripList.Trip[0].Leg.Destination.routeIdx;
        }
        res.send(busRoutes);
    });
});
router.post('/journey', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let journeys = [];
        let bearer = authenticationToken_1.token.tokenType;
        let accessToken = authenticationToken_1.token.accessToken;
        console.log(req.body.ref);
        var uri_dec = decodeURIComponent(req.body.ref);
        let journeyAPI = yield axios_1.default.get(uri_dec, {
            headers: {
                Authorization: bearer + " " + accessToken
            }
        });
        for (var i = 0; i < journeyAPI.data.JourneyDetail.Stop.length; i++) {
            if (i >= origin && i <= destination) {
                journeys.push({
                    "hallplats": journeyAPI.data.JourneyDetail.Stop[i].name,
                    "time": journeyAPI.data.JourneyDetail.Stop[i].rtArrTime
                });
            }
        }
        console.log(journeys);
        res.send(journeys);
    });
});
exports.default = router;
