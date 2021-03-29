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

router.post('/', createTutorial);

router.put('/:tutorial_id', editTutorial);

router.put('/postComment/:tutorial_id',  postComment);

router.delete('/:tutorial_id',  deleteTutorial);

module.exports = router;