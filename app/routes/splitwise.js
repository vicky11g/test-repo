'use strict';

const express = require('express');
const router = new express.Router();
const splitwiseService = require('../service/splitewise.service');

router.post('/test', splitwiseService.createMerchant);

module.exports = router;
