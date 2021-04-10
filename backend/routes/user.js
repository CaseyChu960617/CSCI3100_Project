const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getProfile,
        editProfile,
        follow,
        unfollow } = require('../controllers/user');

router.get('/getProfile/:uid', getProfile);

router.put('/editProfile', editProfile);

router.put('/follow', follow);

router.put('/unfollow', unfollow);


module.exports = router;