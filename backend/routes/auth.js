const express = require('express');
const router = express.Router();
const { signup, signin, activateAccount, generateEmail} = require('../controllers/auth');


router.post('/signup',  authJwt,signup);

router.post('/signin', authJwt, signin);

router.get('/activateAccount/:user_id', activateAccount)

router.get('/generateEmail/:user_id', generateEmail);

module.exports = router;