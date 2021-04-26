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
router.post("/uploadProPic", authJwt.verifyToken, uploadProPic);

router.post("/uploadThumbnail", authJwt.verifyToken, uploadThumbnail);

router.post("/uploadTutorialPic",  authJwt.verifyToken, uploadTutorialPic);

router.post("/uploadDiscussionPic",  authJwt.verifyToken, uploadDiscussionPic);


module.exports = router;