const express = require('express');
const router = express.Router();

const authRts = require('./authRoutes');
const userRts = require('./userRoutes');


router.use('/', authRts);
router.use('/', userRts);



module.exports = router;
