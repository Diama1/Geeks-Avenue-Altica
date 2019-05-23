import jwt from "jsonwebtoken";

class Auth {
    static verifyToken(req, res, next) {
        const bearerheader = req.headers.authorization;
        if (typeof bearerheader !== "undefined") {
            const bearer = bearerheader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;


            jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
                if (err) {
                    res.status(401).json({
                        status: 401,
                        error: "You provided an invalid token",
                    });
                } else {
                    req.user = userData;
                    next();
                }
            });
        } else {
            res.status(401).json({
                status: 401,
                error: "You are not authenticated!",
            });
        }
    }
}

export default Auth;
