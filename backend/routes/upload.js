const express = require('express');
const router = express.Router();
const { uploadProPic } = require('../controllers/upload');

router.post("/uploadProPic", uploadProPic);


module.exports = router;