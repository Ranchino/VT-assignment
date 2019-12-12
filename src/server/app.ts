
import * as BodyParser from 'body-parser' 
import express, { Request, Response } from 'express' 
import { isObject } from 'util'
import { userInfo } from 'os'
const routes = require('./routes/routes')

// Init express and set port
const app = express()
const port = 3000

// Define our routes
app.use(express.static('./build/client'))

app.use('/', routes)
app.use('/api', BodyParser.json())

app.get('/api/?', (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send({ response: "It works!"})
})


// Start server
app.listen(port, () => console.log('Server is running at port ' + port))