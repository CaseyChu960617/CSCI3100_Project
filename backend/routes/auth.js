const express = require('express');
const router = express.Router();
const { signup, signin, activateAccount } = require('../controllers/auth');


router.post('/signup', signup);

router.post('/signin', signin);

router.get('/activateAccount/:user_id', activateAccount)

module.exports = router;