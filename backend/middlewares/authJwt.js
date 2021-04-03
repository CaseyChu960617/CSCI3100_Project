const jwt = require("jsonwebtoken");
const user = require("../models/user");

const verifyToken = (req, res, next) => {

    let accessToken = req.headers['x-access-token'];
    //console.log(accessToken);
    if (!accessToken) {
        return res.status(403).json({ error: "No token provided."})
    }
    const decodedToken = jwt.verify(accessToken, process.env.JWT_ACC_SECRET);
    req.body['uid'] = decodedToken['uid'];
    next();
};

const authJwt = {
    verifyToken: verifyToken,
  };
  
module.exports = authJwt;