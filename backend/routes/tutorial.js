const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");

const { getAllTutorials,
        getSubject,
        getOneTutorial,
        getOneChapter,
        getUserTutorials,
        getFollowingTutorials,
        createTutorial,
        createChapter,
        editTutorial,
        editChapter,
        postComment,
        deleteTutorial, 
        deleteChapter 
    } = require('../controllers/tutorial');


router.get("/", getAllTutorials);

router.get('/subjecty/:subject_id', getSubject);

router.get("/getOneTutorial/:tutorial_id", getOneTutorial);

router.get("/getChapter/:chapter_id", getOneChapter);

router.get('/userTutorials/:my_id', getUserTutorials);

router.post("/followingTutorials", getFollowingTutorials);

router.post("/createTutorial", createTutorial);

router.post("/createChapter", createChapter);

router.put("/editTutorial", editTutorial);

router.put("/editChapter", editChapter);

router.put("/postComment", postComment);

router.delete("/deleteTutorial", deleteTutorial);

router.delete("/deleteChapter", deleteChapter);

module.exports = router;
