const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const {
  getAllTutorials,
  getLatestTutorials,
  getSubject,
  getOneTutorial,
  getOneChapter,
  getMyTutorials,
  getUserTutorials,
  createTutorial,
  createChapter,
  editTutorial,
  editChapter,
  deleteChapter,
} = require("../controllers/tutorial");

// All the routes for Tutorial module
router.get("/", authJwt.verifyToken, getAllTutorials);

router.get("/getLatestTutorials", authJwt.verifyToken, getLatestTutorials);

router.get("/subjecty/:subject_id", authJwt.verifyToken, getSubject);

router.get("/getOneTutorial/:tutorial_id", authJwt.verifyToken, getOneTutorial);

router.get("/getOneChapter/:chapter_id", authJwt.verifyToken, getOneChapter);

router.get("/myTutorials/:user_id", authJwt.verifyToken, getMyTutorials);

router.get("/userTutorials/:user_id", authJwt.verifyToken, getUserTutorials);

//router.post("/followingTutorials", authJwt.verifyToken, getFollowingTutorials);

router.post("/createTutorial", authJwt.verifyToken, createTutorial);

router.post("/createChapter", authJwt.verifyToken, createChapter);

router.put("/editTutorial", authJwt.verifyToken, editTutorial);

router.put("/editChapter", authJwt.verifyToken, editChapter);

//router.put("/postComment", authJwt.verifyToken, postComment);

//router.delete("/deleteTutorial/:tutorial_id", authJwt.verifyToken, deleteTutorial);

router.delete("/deleteChapter/:tutorial_id/:chapter_id", authJwt.verifyToken, deleteChapter);

module.exports = router;
