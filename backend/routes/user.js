const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const { 
    getProfile, 
    getFollower, 
    editProfile, 
    follow, 
    unfollow, 
    updateProPic, 
    resetPassword 
} = require("../controllers/user");

// All the routes for User module
router.get("/:user_id", getProfile);

router.get("/getFollower/:user_id", getFollower);

router.put("/editProfile", authJwt.verifyToken, editProfile);

router.put("/follow", authJwt.verifyToken, follow);

router.put("/unfollow", authJwt.verifyToken, unfollow);

router.put("/updateProPic", authJwt.verifyToken, updateProPic);

router.put("/resetPassword", authJwt.verifyToken, resetPassword);

module.exports = router;
