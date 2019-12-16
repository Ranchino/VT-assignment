import { authentication, token } from '../authenticationToken'
import express, { Request, Response, NextFunction, response } from 'express'
import axios from 'axios'
import fs from 'fs'
import { json } from 'body-parser'
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
        res.status(200).json(response.data)
        console.log(response.data)
       fs.readFile('./All_stops.json', 'utf-8', function(err, data){
           if(err) throw err
           var arrayOfObjects = JSON.parse(data)
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

export default router