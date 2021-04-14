const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllThreads,
        getLatestThreads,
        getSubject,
        getOneThread,
        getUserThreads,
        getFollowingThreads,
        createThread,
        editThread,
        postComment,
        deleteThread } = require('../controllers/thread');


router.get('/', getAllThreads);

router.get('/getLatestThreads', getLatestThreads);

router.get('/subject/:subject_id', getSubject);

router.get('/:thread_id', getOneThread);

router.get('/userThreads/:user_id', getUserThreads);

//router.post('/followingThreads', authJwt, getFollowingThreads);

router.post('/',  authJwt.verifyToken, createThread);

router.put('/editThread',  authJwt.verifyToken, editThread);

router.put('/postComment',  authJwt.verifyToken, postComment);

router.delete('/deleteThread', authJwt.verifyToken, deleteThread);



module.exports = router;