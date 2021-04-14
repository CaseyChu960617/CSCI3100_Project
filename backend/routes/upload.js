const express = require('express');
const router = express.Router();
const { uploadProPic, uploadThumbnail, uploadTutorialPic, uploadDiscussionPic } = require('../controllers/upload');
const { authJwt } = require("../middlewares");

router.post("/uploadProPic", uploadProPic);

router.post("/uploadThumbnail", uploadThumbnail);

router.post("/uploadTutorialPic",  uploadTutorialPic);

router.post("/uploadDiscussionPic",  uploadDiscussionPic);


module.exports = router;