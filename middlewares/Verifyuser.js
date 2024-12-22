import jwt from 'jsonwebtoken'

// User Jwt Token Verify Middleware
const VerifyUser = async (req, res, next) => {
    const token = req?.cookies?.token;
    const { uid } = req.query;

    // Check if token and uid exist in the request
    if (!token || !uid) {
        return res.status(401).send('Unauthorized: Missing token or user ID');
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user ID in the token matches the one in the query
        if (decodedToken.uid === uid) {
            res.send('Hi Succes')
            return next();  // Proceed to the next middleware or route handler
        } else {
            return res.status(403).send('Unauthorized: Token does not match user ID');
        }
    } catch (err) {
        // Return an internal server error if token verification fails
        return res.status(500).send('Unauthorized: Token verification failed');
    }
}

export { VerifyUser }
