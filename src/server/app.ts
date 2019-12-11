
import * as BodyParser from 'body-parser' 
import express, { Request, Response, NextFunction } from 'express'
import router from './routes/routes'

// Init express and set port
const app = express()
const port = 3000
app.use('/api', BodyParser.json())
app.get('/api', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json")
    next()
})
app.use('/api', router)

// Define our routes
app.use(express.static('./build/client'))


// Start server
app.listen(port, () => console.log('Server is running at port ' + port))