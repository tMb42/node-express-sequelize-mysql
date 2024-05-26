const express = require('express');
const userClr = require('../controllers/userController');


const router = express.Router();

router.route('/users').get(userClr.getAllUsers);





module.exports = router;