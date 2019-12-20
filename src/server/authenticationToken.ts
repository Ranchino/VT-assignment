import axios from 'axios'
import { Request, Response, NextFunction } from "express"
export let token: Token
let clientId: string = "koe5BYE1jhJC4vsE6dzJDAX0zfUa"
let clientSecret: string = "BwdHUCabftDUfga6dOf1Bd8NW5oa"
let grantType: string = 'client_credentials'
let URL: string = 'https://api.vasttrafik.se/token'
let expireTime: number = 0

export async function authentication(Request: Request, Response: Response, next: NextFunction){
    if(Date.now() >= expireTime){
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`
        
        const response = await axios.post(URL, data, {
            headers
        })
        expireTime = (response.data.expires_in * 1000) + Date.now()
        token = {
            accessToken: response.data.access_token,
            expireTime: response.data.expires_in,
            tokenType: response.data.token_type
        }
    }    
    next()
}