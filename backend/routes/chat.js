const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllThreads,
        getCategory,
        getOneThread,
        createThread,
        editThread,
        postComment,
        deleteThread } = require('../controllers/thread');


router.get('/getChats', getChats);

router.put('/sendMessage', authJwt.verifyToken, sendMessage);

module.exports = router;