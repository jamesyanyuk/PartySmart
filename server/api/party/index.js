'use strict';

var express = require('express');
var controller = require('./party.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/query', controller.query);

module.exports = router;
