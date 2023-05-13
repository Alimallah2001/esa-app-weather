import  express from "express";
import morgan from "morgan";
import  dotenv  from "dotenv";
import {ConnectDb} from './config/db.js'
import userRoute from './routes/userRoutes.js'

import cors from 'cors'
import bodyParser from 'body-parser'


dotenv.config()

//rest object
const app =express()

//connectin db
ConnectDb()

//middelware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
//routes
app.use('/api/v1/user',userRoute)
//port
const port = process.env.PORT || 8080


//listen port
app.listen(port ,()=>{
    console.log(`server runing in ${port}`)
})


