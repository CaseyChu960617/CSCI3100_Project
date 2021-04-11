const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllThreads,
        getCategory,
        getOneThread,
        getUserThreads,
        getFollowingThreads,
        createThread,
        editThread,
        postComment,
        deleteThread } = require('../controllers/thread');


router.get('/', getAllThreads);

router.get('/category/:category_id', getCategory);

router.get('/:thread_id', getOneThread);

router.get('/userThreads/:user_id', getUserThreads);

router.post('/followingThreads', getFollowingThreads);

router.post('/',  createThread);

router.put('/editThread',  editThread);

router.put('/postComment',  postComment);

router.delete('/deleteThread', deleteThread);


module.exports = router;