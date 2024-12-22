import jwt from 'jsonwebtoken'

// Create a new Token 
const authUserToken = async (req, res) => {

    const { uid } = req.body
    
    try{
        if(!uid){
            return res.status(400).send({error: 'must give uid'})
        }
        const token = await jwt.sign({uid: uid}, process.env.JWT_SECRET, {expiresIn: '1day'})

        return res.cookie('token', token, {
            httpOnly: true,
            secure: true,
        }).send({succes: true})
    }
    catch{
        res.status(400).send({succes: false})
    }
}

export { authUserToken }