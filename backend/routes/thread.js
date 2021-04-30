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
router.get('/',  getAllThreads);

router.get('/getLatestThreads', getLatestThreads);

router.get('/subject/:subject_id', getSubject);

router.get('/:thread_id', getOneThread);

router.get('/userThreads/:user_id', getUserThreads);

//router.post('/followingThreads', authJwt, getFollowingThreads);

router.post('/', createThread);

//router.put('/editThread',  editThread);

router.put('/postComment', postComment);

//router.delete('/deleteThread', authJwt.verifyToken, deleteThread);



module.exports = router;