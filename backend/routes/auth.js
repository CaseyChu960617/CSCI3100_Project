const express = require('express');
const router = express.Router();

const { signup, signin, activateAccount } = require('../controllers/auth');

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/activateAccount/:uid', activateAccount)

module.exports = router;