const express = require('express');
const router = express.Router();

const authRts = require('./AuthRoutes');
const userRts = require('./UserRoutes');


router.use('/', authRts);
router.use('/', userRts);



module.exports = router;
