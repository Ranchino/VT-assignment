import bodyParser from 'body-parser' 
import express, { Request, Response, NextFunction } from 'express'
import router from './routes/routes'

// Init express and set port
const app = express()
const port = 3000


app.use('/api', bodyParser.json())

app.use('/api', router)





// Define our routes
app.use(express.static('./build/client'));

app.get('/', function(req: Request, res: Response, next: NextFunction){
    
})


// Start server
app.listen(port, () => console.log('Server is running at port ' + port))