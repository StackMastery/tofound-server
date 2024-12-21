import express from 'express'

// Router Variable 
const mainRouter = express.Router() // Router Initialed

// Default Route Like 404
mainRouter.get('*', (req, res) => {
    res.send({
        msg: "Hi I'm To Found Web Server 😊"
    })
})

export { mainRouter }