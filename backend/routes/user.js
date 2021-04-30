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
    changePassword 
} = require("../controllers/user");

// All the routes for User module
router.get("/:user_id", getProfile);

router.put("/editProfile", editProfile);

router.put("/follow", follow);

router.put("/unfollow", unfollow);

router.put("/updateProPic", updateProPic);

router.put("/changePassword",  changePassword);

router.get("/getFollower/:user_id", getFollower);


module.exports = router;
