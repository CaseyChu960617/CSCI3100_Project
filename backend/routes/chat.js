const express = require('express');
const router = express.Router();
//const { authJwt } = require("../middlewares");

const { getAllChats,
        getOneChatById,
        getOneChat,
        //sendMessage 
      } = require('../controllers/chat');


router.get('/getAllChats/:uid', getAllChats);

router.get('/getOneChat/:chat_id', getOneChatById);

router.post('/getOneChat', getOneChat);

// router.put('/sendMessage/:chat_id', sendMessage);

module.exports = router;