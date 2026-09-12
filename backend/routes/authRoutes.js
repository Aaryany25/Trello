const express = require('express');
const router = express.Router();
const { signup, signin, logout } = require('../controllers/authController');
const { validate } = require('../middleware/validate');
const { signupSchema, signinSchema } = require('../schemas/authSchemas');

router.post('/signup', validate({ body: signupSchema }), signup);
router.post('/signin', validate({ body: signinSchema }), signin);
router.post('/logout', logout);
router.get('/logout', logout);

module.exports = router;
