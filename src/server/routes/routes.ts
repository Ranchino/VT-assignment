import { authentication, token } from '../authenticationToken'
import express, { Request, Response, NextFunction, response } from 'express'
import axios from 'axios'
import fs from 'fs'
import { text } from 'body-parser'
let router = express.Router()

var origin: any;
var destination: any;

router.use('/', authentication)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    let bearer: string = token.tokenType
    let accessToken: string = token.accessToken
    axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json', {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })
    .then(function(response){
        fs.readFile('./All_stops.json', 'utf-8', async function(err, data){
            if(err) throw err
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.All_Stops = []
            arrayOfObjects.All_Stops.push(response.data.LocationList)

            fs.writeFile('./All_stops.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err){
                if(err) throw err
                console.log("done")
            })
        })
    }).catch(function(error) {
        console.log("ERROR: ", error)
    }).then(next)
})

router.post('/location', (req: Request, res: Response, next: NextFunction) => {
    let array: any = [];
    let searchResults: any;
    // Resets array for every input liste
    array = [];
    fs.readFile('./All_stops.json', 'utf-8', function(err, data){
        var arrayOfObjects = JSON.parse(data)
        let allStopsList = arrayOfObjects.All_Stops[0].StopLocation
        for (var i = 0; i < allStopsList.length; i++) {
            if (allStopsList[i].name.includes(req.body.searchValue) && allStopsList[i].track === undefined) {
                searchResults = {
                    'hallplats': arrayOfObjects.All_Stops[0].StopLocation[i].name,
                    'id': arrayOfObjects.All_Stops[0].StopLocation[i].id
                }
                
                array.push(searchResults)

                if (array.length === 10) {
                    break;
                }
              
            }
        }
        res.send(array)
    })
})

router.post('/getTrips', async function(req: Request, res: Response, next: NextFunction) {
    let url: string;
    let busRoutes: any = [];
    busRoutes = [];

    // Testar
    if( req.body.searchForArrival && req.body.markVas || req.body.markBus || req.body.markTram || req.body.markBoat || req.body.markTrain){
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&useVas=${req.body.markVas}&useBus=${req.body.markBus}&useBoat=${req.body.markBoat}&useTram=${req.body.markTram}&useRegTrain=${req.body.markTrain}&searchForArrival=${req.body.searchForArrival}&numTrips=4&format=json`
    }else if (req.body.markVas || req.body.markBus || req.body.markTram || req.body.markBoat || req.body.markTrain){
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&useVas=${req.body.markVas}&useBus=${req.body.markBus}&useBoat=${req.body.markBoat}&useTram=${req.body.markTram}&useRegTrain=${req.body.markTrain}&numTrips=4&format=json`
    }else if(req.body.searchForArrival) {
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&searchForArrival=${req.body.searchForArrival}&numTrips=4&format=json`
    } else {
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&numTrips=4&format=json`
    }
    
    
    let bearer: string = token.tokenType
    let accessToken: string = token.accessToken


    let tripsAPI = await axios.get(url, {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })

    busRoutes.push(tripsAPI.data.TripList.Trip);

    var uri: any;

    let hasArray = tripsAPI.data.TripList.Trip[0].Leg

    if(Array.isArray(hasArray)) {
        console.log("har array")
        uri = tripsAPI.data.TripList.Trip[0].Leg[0].JourneyDetailRef.ref
        origin = tripsAPI.data.TripList.Trip[0].Leg[0].Origin.routeIdx
        destination = tripsAPI.data.TripList.Trip[0].Leg[0].Destination.routeIdx
    } else {
        console.log("har inte array")
        uri = tripsAPI.data.TripList.Trip[0].Leg.JourneyDetailRef.ref
        origin = tripsAPI.data.TripList.Trip[0].Leg.Origin.routeIdx
        destination = tripsAPI.data.TripList.Trip[0].Leg.Destination.routeIdx
    }

    res.send(busRoutes)
})

router.post('/journey', async function(req: Request, res: Response, next: NextFunction) {
    let journeys: any = []
    let bearer: string = token.tokenType
    let accessToken: string = token.accessToken

    console.log(req.body.ref)
    var uri_dec = decodeURIComponent(req.body.ref);

    let journeyAPI = await axios.get(uri_dec, {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })

    for (var i = 0; i < journeyAPI.data.JourneyDetail.Stop.length; i++) {
        if( i >= origin && i <= destination){
            journeys.push(
                {
                    "hallplats": journeyAPI.data.JourneyDetail.Stop[i].name,
                    "time": journeyAPI.data.JourneyDetail.Stop[i].rtArrTime
                }
            )
        }
    }

    console.log(journeys)
    res.send(journeys)


})


export default router