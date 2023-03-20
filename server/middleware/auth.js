import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); // this is where the frontend will set the token
        
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) { //this is how we get the token the front end send back
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // check the token with the jwt secret to verify
        req.user = verified;
        next(); // need this for middleware, so need to pass on to next function


    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}