const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllTutorials,
        getCategory,
        getOneTutorial,
        createTutorial,
        editTutorial,
        postComment,
        deleteTutorial } = require('../controllers/tutorial');

router.get('/', getAllTutorials);

router.get('/category/:category_id', getCategory);

router.get('/:tutorial_id', getOneTutorial);

router.get('/getChapter/:chapter_id', getOneChapter);

router.get('/myTutorials/:my_id', getMyThreads);

router.post('/followingTutorials', getFollowingThreads);

router.post('/', createTutorial);

router.post('/createChapter', createTutorial);

router.put('/editTutorial', editTutorial);

router.post('/editChapter', createTutorial);

router.put('/postComment',  postComment);

router.delete('/deleteTutorial',  deleteTutorial);

router.delete('/deleteChatper',  deleteChapter);

//router.post('/createChapter', createChapter);

module.exports = router;