const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getProfile, getFollower, editProfile, follow, unfollow, updateProPic, resetPassword } = require("../controllers/user");

router.get("/:user_id", getProfile);

router.get("/getFollower/:user_id", getFollower);

router.put("/editProfile",  authJwt,editProfile);

router.put("/follow",  authJwt,follow);

router.put("/unfollow",  authJwt,unfollow);

router.put("/updateProPic",  authJwt,updateProPic);

router.put("/resetPassword",  authJwt,resetPassword);

module.exports = router;
