const express = require('express');
const router = express.Router();
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

router.post('/:thread_id', createThread);

router.put('/:thread_id', editThread);

router.put('/postComment', postComment);

router.delete('/:thread_id', deleteThread);

module.exports = router;