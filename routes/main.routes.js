import express from 'express'
import { authUserToken } from '../controllers/auth.controller.js'

// Router Variable 
const mainRouter = express.Router() // Router Initialed


// Auth Routes
mainRouter.post('/auth/create', authUserToken)

mainRouter.get('/api', (req, res) => {
    res.send('asdhsahh')
})
// Default Route Like 404
mainRouter.get('*', (req, res) => {
    res.send({
        msg: "Hi I'm To Found Web Server 😊"
    })
})

export { mainRouter }