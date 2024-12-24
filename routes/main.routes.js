import express from 'express'
import { AuthLogout, authUserToken } from '../controllers/auth.controller.js'
import { AddRecoverPost, AllPostInfinte, CreateNewPost, DialogeletePostByPostId, ReadAllRecovered, ReadAllUserPostedItems, ReadPost, ReadPostWithLimit, UpdatePostById } from '../controllers/post.controller.js'
import { VerifyUser } from '../middlewares/Verifyuser.js'
import { SubscribeModel } from '../models/subscribe.model.js'

// Router Variable 
const mainRouter = express.Router() // Router Initialed


// Items CRUD Routes
// Create - Post
mainRouter.post('/post/add', VerifyUser, CreateNewPost) // Creating New Post
mainRouter.post('/post/add/recover', VerifyUser, AddRecoverPost) // Creating new recover
mainRouter.post('/post/update', VerifyUser, UpdatePostById) //Update Post By Id

// Read - Get
mainRouter.get('/post/read', VerifyUser, ReadPost) // Read Post
mainRouter.get('/post/all/recovered', VerifyUser, ReadAllRecovered ) // Read All Recovered Posts
mainRouter.get('/post/read/limit', ReadPostWithLimit) //For Home
mainRouter.get('/post/all', AllPostInfinte) // All Post infinitie
mainRouter.get('/post/read/my', VerifyUser, ReadAllUserPostedItems) //For user Posted Items

// Delete = DELETE
mainRouter.delete('/post/delete', VerifyUser, DialogeletePostByPostId) //Delete Post by Post Id

// Auth Routes
mainRouter.post('/auth/create', authUserToken) // Genaret JWT token And Seting To Cookie
mainRouter.get('/auth/logout', AuthLogout) //Logout


// Email Subscribe Controller
mainRouter.post('/subscribe', async (req, res) => {
    try {
        const newSubscribe = new SubscribeModel({
            email: req.query.email,
        });

        const user = await newSubscribe.save();

        return res.send({ success: true });
    } catch (err) {
        if (!err.code === 11000) {
            return res.status(400).send({ code: 11000, success: false, msg: 'Email already subscribed' });
        }
        return res.status(500).send({ success: false, msg: 'Internal server error', error: err.message });
    }
});



// Default Route Like 404
mainRouter.get('*', (req, res) => {
    res.send({
        msg: "Hi I'm To Found Web Server 😊"
    })
})

export { mainRouter }