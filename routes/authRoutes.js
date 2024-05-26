const express = require('express');
const authClr = require('../controllers/authController');
const verifyToken = require('../middleware/VerifyJwtToken');

const router = express.Router();


router.route('/register').post(authClr.signUp);
router.route('/login').post(authClr.signIn);
router.route('/logout').post(verifyToken, authClr.signOut);






module.exports = router;
