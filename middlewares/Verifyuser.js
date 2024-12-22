// import jwt from 'jsonwebtoken'

// // User Jwt Token Verify Middleware
// const VerifyUser = async (req, res, next) => {
//     const token = req.cookies?.token
//     const { uid } = req.query

//     try{
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

//         if(decodeToken){
//             return next()
//         }else{
//             return res.status(400).send('Unautorized user' + token)
//         }
//     }
//     catch(err){
//         return res.status(200).send('Unautorized user' + err + token)
//     }

// }

// // export { VerifyUser }

import jwt from 'jsonwebtoken';

// User JWT Token Verify Middleware
const VerifyUser = async (req, res, next) => {
    const token = req?.cookies?.token;
    const { uid } = req.query;

    if (!token || !uid) {
        return res.status(400).send('Unauthorized user: Token or UID missing');
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the UID in the token matches the UID in the request
        if (decodeToken.uid === uid) {
            return next();
        } else {
            return res.status(401).send('Unauthorized user: UID mismatch');
        }
    } catch (err) {
        return res.status(401).send('Unauthorized user: Invalid token');
    }
};

export { VerifyUser };
