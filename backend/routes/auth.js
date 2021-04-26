const express = require('express');
const router = express.Router();
const { 
    signUp, 
    signIn, 
    activateAccount, 
    generateEmail 
} = require('../controllers/auth');


router.post('/signup',  signUp);

router.post('/signin', signIn);

router.get('/activateAccount/:user_id', activateAccount)

router.get('/generateEmail/:user_id', generateEmail);

module.exports = router;