import express from 'express'
import { authUserToken } from '../controllers/auth.controller.js'
import { CreateNewPost } from '../controllers/post.controller.js'
import { VerifyUser } from '../middlewares/Verifyuser.js'

// Router Variable 
const mainRouter = express.Router() // Router Initialed


// Items CRUD Routes
// Create
mainRouter.post('/post/add', VerifyUser, CreateNewPost)

// Auth Routes
mainRouter.post('/auth/create', authUserToken) // Genaret JWT token And Seting To Cookie

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