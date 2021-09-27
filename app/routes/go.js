'use strict';

const express = require('express');
const router = new express.Router();
const mservice = require('../service/merchant.service');

router.get('/test', mservice.getList);
router.get('/test/:name', mservice.getMerchant);
router.post('/test', mservice.createMerchant);

module.exports = router;
