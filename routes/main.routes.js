import express from 'express'
import { authUserToken } from '../controllers/auth.controller.js'
import { AddRecoverPost, CreateNewPost, ReadPost } from '../controllers/post.controller.js'
import { VerifyUser } from '../middlewares/Verifyuser.js'

// Router Variable 
const mainRouter = express.Router() // Router Initialed


// Items CRUD Routes
// Create - Post
mainRouter.post('/post/add', VerifyUser, CreateNewPost) // Creating New Post
mainRouter.post('/post/add/recover', VerifyUser, AddRecoverPost) // Creating new recover

// Read - Get
mainRouter.get('/post/read', ReadPost)

// Auth Routes
mainRouter.post('/auth/create', authUserToken) // Genaret JWT token And Seting To Cookie

// Default Route Like 404
mainRouter.get('*', (req, res) => {
    res.send({
        msg: "Hi I'm To Found Web Server 😊"
    })
})

export { mainRouter }