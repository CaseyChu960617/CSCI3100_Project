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
  getFollowingTutorials,
  createTutorial,
  createChapter,
  editTutorial,
  editChapter,
  postComment,
  deleteTutorial,
  deleteChapter,
} = require("../controllers/tutorial");

router.get("/", getAllTutorials);

router.get("/getLatestTutorials", getLatestTutorials);

router.get("/subjecty/:subject_id", getSubject);

router.get("/getOneTutorial/:tutorial_id", getOneTutorial);

router.get("/getOneChapter/:chapter_id", getOneChapter);


router.get("/myTutorials/:user_id", getMyTutorials);

router.get("/userTutorials/:user_id", getUserTutorials);

router.post("/followingTutorials", authJwt, getFollowingTutorials);

router.post("/createTutorial", authJwt, createTutorial);

router.post("/createChapter", authJwt, createChapter);

router.put("/editTutorial", authJwt, editTutorial);

router.put("/editChapter",  authJwt,editChapter);

router.put("/postComment", authJwt, postComment);

router.delete("/deleteTutorial/:tutorial_id", authJwt, deleteTutorial);

router.delete("/deleteChapter/:tutorial_id/:chapter_id", authJwt, deleteChapter);

module.exports = router;
