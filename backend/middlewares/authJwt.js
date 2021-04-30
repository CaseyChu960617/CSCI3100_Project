const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let accessToken = req.headers['x-access-token'];

        if (!accessToken) {
            return res.status(403).send("No token provided or token expired. Please sign in again.");
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACC_SECRET);
        req.body['user_id'] = decodedToken['user_id']; //changed Name
        next();
    }
    catch(err) {
        return res.status(403).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken: verifyToken,
  };
  
module.exports = authJwt;