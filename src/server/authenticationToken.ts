import axios from 'axios'
import { Request, Response, NextFunction } from "express"
export let accessToken: string = ""
let clientId: string = "koe5BYE1jhJC4vsE6dzJDAX0zfUa"
let clientSecret: string = "BwdHUCabftDUfga6dOf1Bd8NW5oa"
let grantType: string = 'client_credentials'
let URL: string = 'https://api.vasttrafik.se/token'

export function authentication(Request: Request, Response: Response, next: NextFunction){
    
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`

    axios.post(URL, data, {
        headers
    })
    .then(function(response){
        accessToken = response.data.access_token
    }).catch(function(error) {
        console.log("ERROR: ", error)
    }).finally(next)
}