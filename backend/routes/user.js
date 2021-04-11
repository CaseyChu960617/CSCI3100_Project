const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getProfile,
        editProfile,
        follow,
        unfollow,
        updateProPic } = require('../controllers/user');

router.get('/getProfile/:uid', getProfile);

router.put('/editProfile', editProfile);

router.put('/follow', follow);

router.put('/unfollow', unfollow);

router.put('/updateProPic', updateProPic);

module.exports = router;