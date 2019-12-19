import { authentication, token } from '../authenticationToken'
import express, { Request, Response, NextFunction, response } from 'express'
import axios from 'axios'
import fs from 'fs'
import { json } from 'body-parser'
let router = express.Router()
//let today = Date.now()
let expireTime: number = 0

router.get('/', authentication)

router.get('/', (req: Request, res: Response, next: NextFunction) => {

    console.log("Expire: ", expireTime)
    console.log("Now: ", Date.now())

    if(Date.now() >= expireTime){
        
        let bearer: string = token.tokenType
        let accessToken: string = token.accessToken
        axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json', {
            headers: {
                Authorization: bearer + " " + accessToken
            }
        })
        .then(function(response){
            expireTime = Date.now() + (1000 * 60 * 60 * 24) 
            res.status(200).json(response.data)
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
    }else {
        next()
    }
        /* console.log("asd")
        next() */
    
})

export default router