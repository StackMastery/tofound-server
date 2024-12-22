// import jwt from 'jsonwebtoken'

// // Create a new Token 
// const authUserToken = async (req, res) => {

//     const { uid } = req.body
    
//     try{
//         if(!uid){
//             return res.status(400).send({error: 'must give uid'})
//         }
//         const token = await jwt.sign({uid: uid}, process.env.JWT_SECRET, {expiresIn: '1day'})

//         return res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//         }).send({succes: true})
//     }
//     catch{
//         res.status(400).send({succes: false})
//     }
// }

// export { authUserToken }


import jwt from 'jsonwebtoken';

// Create a new Token 
const authUserToken = async (req, res) => {
    const { uid } = req.body;

    try {
        // Validate uid
        if (!uid || typeof uid !== 'string' || uid.trim() === '') {
            return res.status(400).send({ error: 'must provide a valid uid' });
        }

        // Generate JWT
        const token = await jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Set cookie and send response
        return res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        }).send({ success: true });
    } 
    catch (error) {
        console.error('Error creating token:', error);
        res.status(500).send({ success: false, error: 'Internal server error' });
    }
};

export { authUserToken };
