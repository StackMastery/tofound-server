import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db/dbConnect.js'
import { mainRouter } from './routes/main.routes.js'

// Loading Dotenv On First When Application Load
dotenv.config()

// App Configs
const app = express() // Express 
const port = process.env.PORT || 3000 // Application Port

// Middlewares
app.use(cors()) // Cors Origin Policy
app.use(express.urlencoded({ extended: true })) // Urlencoded Middleware
app.use(express.json()) // Json Middleware

// Routes Middleware Used
app.use(mainRouter)


// In my application i like to listen app after connected to mongodb databse 
// Databse Connection
connectDB()
    .then(() => {
        app.listen(port, (req, res) => { // After databse response
            console.log(`Server running on ${port} Port`)
        })
    })



