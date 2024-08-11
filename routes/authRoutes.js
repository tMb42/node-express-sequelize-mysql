const express = require('express');
const authClr = require('../controllers/authController');
const verifyToken = require('../middleware/verifyJwtToken');
const verifyPatToken = require('../middleware/verifyPersonalAccessToken');
const verifyPatWaToken = require('../middleware/verifyPersonalAccessTokenWithAbilities');

const router = express.Router();


router.route('/register').post(authClr.signUp);
router.route('/login').post(authClr.signIn);
router.route('/logout').post(verifyPatToken, authClr.signOut);
router.route('/email/verify/:userId/:token').get(authClr.verifyEmail);
router.route('/userDetails').get(verifyPatToken, authClr.getAuthUserDetails);


module.exports = router;
