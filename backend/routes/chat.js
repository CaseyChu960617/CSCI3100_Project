const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const { 
    getAllChats,
    getOneChatById,
    getOneChat,
    sendMessage
} = require('../controllers/chat');

// All the routes for Chat module
router.get('/getAllChats/:user_id', authJwt.verifyToken, getAllChats);

router.get('/getOneChat/:chat_id',  authJwt.verifyToken, getOneChatById);

router.post('/getOneChat', authJwt.verifyToken, getOneChat);

module.exports = router;