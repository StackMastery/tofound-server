import jwt from 'jsonwebtoken'

// User Jwt Token Verify Middleware
const VerifyUser = async (req, res, next) => {
    const token = req.cookies?.token
    const { uid } = req.query

    try{
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        if(decodeToken){
            return next()
        }else{
            return res.status(400).send('Unautorized user' + token)
        }
    }
    catch(err){
        return res.status(200).send('Unautorized user' + err + token)
    }

}

// export { VerifyUser }