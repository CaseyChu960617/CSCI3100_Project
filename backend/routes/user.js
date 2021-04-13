const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getProfile, editProfile, follow, unfollow, updateProPic, resetPassword } = require("../controllers/user");

router.get("/:user_id", getProfile);

router.put("/editProfile", editProfile);

router.put("/follow", follow);

router.put("/unfollow", unfollow);

router.put("/updateProPic", updateProPic);

router.put("/resetPassword", resetPassword);

module.exports = router;
