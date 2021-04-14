const express = require('express');
const router = express.Router();
const { uploadProPic, uploadThumbnail, uploadTutorialPic, uploadDiscussionPic } = require('../controllers/upload');

router.post("/uploadProPic",  authJwt,uploadProPic);

router.post("/uploadThumbnail",  authJwt,uploadThumbnail);

router.post("/uploadTutorialPic",  authJwt,uploadTutorialPic);

router.post("/uploadDiscussionPic",  authJwt,uploadDiscussionPic);


module.exports = router;