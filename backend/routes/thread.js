const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllThreads,
        getCategory,
        getOneThread,
        getMyThreads,
        getFollowingThreads,
        createThread,
        editThread,
        postComment,
        deleteThread } = require('../controllers/thread');


router.get('/', getAllThreads);

router.get('/category/:category_id', getCategory);

router.get('/:thread_id', getOneThread);

router.get('/myThreads/:my_id', getMyThreads);

router.post('/followingThreads', getFollowingThreads);

router.post('/',  createThread);

router.put('/editThread',  editThread);

router.put('/postComment',  postComment);

router.delete('/deleteThread', deleteThread);


module.exports = router;