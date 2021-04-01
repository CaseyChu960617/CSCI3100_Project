const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getProfile,
        editProfile,
        getChats,
        follow,
        unfollow } = require('../controllers/user');

router.get('/getProfile/:uid', getProfile);

router.put('/editProfile/:uid', editProfile);

router.get('/getChats/:uid', getChats);

router.put('/follow', follow);

router.put('/unfollow', unfollow);


module.exports = router;