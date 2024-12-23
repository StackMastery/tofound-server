import express from 'express'
import { AuthLogout, authUserToken } from '../controllers/auth.controller.js'
import { AddRecoverPost, CreateNewPost, ReadAllRecovered, ReadPost, ReadPostWithLimit } from '../controllers/post.controller.js'
import { VerifyUser } from '../middlewares/Verifyuser.js'

// Router Variable 
const mainRouter = express.Router() // Router Initialed


// Items CRUD Routes
// Create - Post
mainRouter.post('/post/add', VerifyUser, CreateNewPost) // Creating New Post
mainRouter.post('/post/add/recover', VerifyUser, AddRecoverPost) // Creating new recover

// Read - Get
mainRouter.get('/post/read', VerifyUser, ReadPost) // Read Post
mainRouter.get('/post/all/recovered', VerifyUser, ReadAllRecovered ) // Read All Recovered Posts
mainRouter.get('/post/read/limit', ReadPostWithLimit)

// Auth Routes
mainRouter.post('/auth/create', authUserToken) // Genaret JWT token And Seting To Cookie
mainRouter.get('/auth/logout', AuthLogout) //Logout

// Default Route Like 404
mainRouter.get('*', (req, res) => {
    res.send({
        msg: "Hi I'm To Found Web Server 😊"
    })
})

export { mainRouter }