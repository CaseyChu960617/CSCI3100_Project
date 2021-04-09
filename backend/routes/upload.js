const express = require('express');
const router = express.Router();
//const { authJwt } = require("../middlewares");

const { uploadProPic
      } = require('../controllers/upload');


router.post('/profilePic', uploadProPic);

router.get('/profilePic', uploadProPic);

module.exports = router;