const express = require('express');
const router = express.Router();
const { uploadProPic, uploadThumbnail } = require('../controllers/upload');

router.post("/uploadProPic", uploadProPic);

router.post("/uploadThumbnail", uploadThumbnail);


module.exports = router;