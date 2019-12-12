import { authentication, accessToken } from '../authenticationToken'
import express, { Request, Response, NextFunction } from 'express'

let router = express.Router()

router.get('/', authentication)
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: accessToken })
    next()
})

export default router