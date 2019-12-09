import { authentication } from '../authenticationToken'
import express, { Request, Response } from 'express'


let router = express.Router()


router.get('/', authentication)
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "success" })
})

module.exports = router