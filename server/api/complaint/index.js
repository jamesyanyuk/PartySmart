'use strict';

var express = require('express');
var controller = require('./complaint.controller');
var evaluator = require('./complaint.evaluator');

var router = express.Router();

evaluator.loop(15);

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:complainant', controller.destroy);
router.put('/:complainant', controller.update);
router.get('/:complainant', controller.show);

module.exports = router;
