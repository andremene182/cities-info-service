var express = require('express');
var router = express.Router();

var citiesInfoRouter = require('./citiesInfoRouter');

router.use('/cities-info', citiesInfoRouter);

module.exports = router;