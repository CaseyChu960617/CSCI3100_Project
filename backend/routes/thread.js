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


router.get('/', getAllThreads);

router.get('/category/:category_id', getCategory);

router.get('/:thread_id', getOneThread);

router.post('/', authJwt.verifyToken, createThread);

router.put('/:thread_id', editThread);

router.put('/postComment/:thread_id',  postComment);

router.delete('/:thread_id',  deleteThread);

module.exports = router;