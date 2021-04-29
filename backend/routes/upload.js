const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const { 
    uploadProPic, 
    uploadThumbnail, 
    uploadTutorialPic, 
    uploadDiscussionPic 
} = require('../controllers/upload');

// All the routes for Upload Module
router.post("/uploadProPic", uploadProPic);

router.post("/uploadThumbnail", uploadThumbnail);

router.post("/uploadTutorialPic", uploadTutorialPic);

router.post("/uploadDiscussionPic", uploadDiscussionPic);


module.exports = router;