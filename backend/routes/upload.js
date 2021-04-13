const express = require('express');
const router = express.Router();
const { uploadProPic, uploadThumbnail, uploadTutorialPic } = require('../controllers/upload');

router.post("/uploadProPic", uploadProPic);

router.post("/uploadThumbnail", uploadThumbnail);

router.post("/uploadTutorialPic", uploadTutorialPic);


module.exports = router;