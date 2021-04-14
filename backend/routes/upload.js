const express = require('express');
const router = express.Router();
const { uploadProPic, uploadThumbnail, uploadTutorialPic, uploadDiscussionPic } = require('../controllers/upload');
const { authJwt } = require("../middlewares");

router.post("/uploadProPic", authJwt.verifyToken, uploadProPic);

router.post("/uploadThumbnail", authJwt.verifyToken, uploadThumbnail);

router.post("/uploadTutorialPic",   uploadTutorialPic);

router.post("/uploadDiscussionPic",   uploadDiscussionPic);


module.exports = router;