var express = require('express');
var router = express.Router();

var citiesInfoRouterV1 = require('./v1');

router.use('/v1', citiesInfoRouterV1);

module.exports = router;