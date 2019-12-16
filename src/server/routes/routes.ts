import { authentication, token } from '../authenticationToken'
import express, { Request, Response, NextFunction, response } from 'express'
import axios from 'axios'

let router = express.Router()


router.get('/', authentication)
/* router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: token })
    next()
}) */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    let bearer: string = token.tokenType
    let accessToken: string = token.accessToken
    axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=ols&format=json', {
        headers: {
            Authorization: bearer + " " + accessToken
        }
    })
    .then(function(response){
        res.status(200).json({response: response.data})
        //console.log(response.data)
        
    }).catch(function(error) {
        console.log("ERROR: ", error)
    }).then(next)
})

export default router