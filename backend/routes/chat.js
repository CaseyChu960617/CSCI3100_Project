const express = require('express');
const router = express.Router();
//const { authJwt } = require("../middlewares");

const { getAllChats,
        getOneChat,
        sendMessage } = require('../controllers/chat');


router.get('/getAllChats/:uid', getAllChats);

router.post('/getOneChat', getOneChat);

router.put('/sendMessage/:chat_id', sendMessage);

module.exports = router;