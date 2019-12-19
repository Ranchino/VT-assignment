import { authentication, token } from '../authenticationToken'
import express, { Request, Response, NextFunction, response } from 'express'
import axios from 'axios'
import fs from 'fs'
let router = express.Router()

router.get('/', authentication)
/* router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: token })
    next()
}) */
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

    if (req.body.time && req.body.date && req.body.searchForArrival) {
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&date=${req.body.date}&time=${req.body.time}&searchForArrival=${req.body.searchForArrival}&format=json`
    } else {
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${req.body.idFrom}&destId=${req.body.idTo}&format=json`
    }
    
    
    let bearer: string = token.tokenType
    let accessToken: string = token.accessToken


    let tripsAPI = await axios.get(url, {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })

    var uri = tripsAPI.data.TripList.Trip[0].Leg.JourneyDetailRef.ref
    var uri_dec = decodeURIComponent(uri);

    console.log(uri_dec)

    let origin = tripsAPI.data.TripList.Trip[0].Leg.Origin.routeIdx
    let destination = tripsAPI.data.TripList.Trip[0].Leg.Destination.routeIdx
    
    let journeyAPI = await axios.get(uri_dec, {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })

    for (var i = origin; i <= destination; i++) {
        console.log(i)
        for (var a = 0; a < journeyAPI.data.JourneyDetail.Stop.length; a++) {
            if (journeyAPI.data.JourneyDetail.Stop[a].routeIdx.includes(i)) {
                busRoutes.push(
                    { 
                        "name": journeyAPI.data.JourneyDetail.Stop[a].name,
                        "arrivalTime": journeyAPI.data.JourneyDetail.Stop[a].arrTime 
                    } 
                )
            }
        }
        
    }

    console.log(busRoutes)

})

export default router