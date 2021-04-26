const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const { 
    getAllThreads,
    getLatestThreads,
    getSubject,
    getOneThread,
    getUserThreads,
    createThread,
    editThread,
    postComment,
    deleteThread 
} = require('../controllers/thread');

// All the routes for Discussion forum module
router.get('/', authJwt.verifyToken, getAllThreads);

router.get('/getLatestThreads', authJwt.verifyToken, getLatestThreads);

router.get('/subject/:subject_id', authJwt.verifyToken, getSubject);

router.get('/:thread_id', authJwt.verifyToken,  getOneThread);

router.get('/userThreads/:user_id', authJwt.verifyToken, getUserThreads);

//router.post('/followingThreads', authJwt, getFollowingThreads);

router.post('/', authJwt.verifyToken, createThread);

router.put('/editThread', authJwt.verifyToken, editThread);

router.put('/postComment', authJwt.verifyToken, postComment);

router.delete('/deleteThread', authJwt.verifyToken, deleteThread);



module.exports = router;