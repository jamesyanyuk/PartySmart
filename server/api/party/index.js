'use strict';

var express = require('express');
var controller = require('./party.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/query', controller.query);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;
