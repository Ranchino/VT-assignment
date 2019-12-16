import axios from 'axios'
import { Request, Response, NextFunction } from "express"
export let token: Token
let clientId: string = "koe5BYE1jhJC4vsE6dzJDAX0zfUa"
let clientSecret: string = "BwdHUCabftDUfga6dOf1Bd8NW5oa"
let grantType: string = 'client_credentials'
let URL: string = 'https://api.vasttrafik.se/token'
let expireTime: number

export async function authentication(Request: Request, Response: Response, next: NextFunction){
    
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`

    await axios.post(URL, data, {
        headers
    })
    .then(function(response){
        expireTime = response.data.expires_in
        token = {
            accessToken: response.data.access_token,
            expireTime: response.data.expires_in,
            tokenType: response.data.token_type
        }
    }).catch(function(error) {
        console.log("ERROR: ", error)
    }).finally(next)
}