import jwt from 'jsonwebtoken'

// Create a new Token 
const authUserToken = async (req, res) => {

    const { uid } = req.body
    
    try{
        if(!uid){
            return res.status(400).send({error: 'must give uid'})
        }
        const token = await jwt.sign({uid: uid}, process.env.JWT_SECRET, {expiresIn: '1day'})

        const isProduction = process.env.NODE_ENV === 'production';

        return res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
        }).send({succes: true})
    }
    catch{
        res.status(400).send({succes: false})
    }
}

// Logout
const AuthLogout = (req, res) => {
    res.
        clearCookie('token')
        .send({succes: true})
}

export { authUserToken, AuthLogout }