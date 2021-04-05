const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllChats,
        sendMessage } = require('../controllers/thread');


router.get('/getAllChats', getAllChats);

router.get('/getOneChat', getOneChat);

router.put('/sendMessage/:chat_id', sendMessage);