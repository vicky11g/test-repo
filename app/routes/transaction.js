'use strict';

const express = require('express');
const router = new express.Router();
const transactionService = require('../service/transaction.service');

router.post('/:username/:groupname/group', transactionService.recordTransaction);
router.get('/:username/:groupname/group', transactionService.getTransaction);
router.get('/list/:username/:groupname', transactionService.getGroupData);

router.post('/settel/:username/:groupname', transactionService.recordSettelment);
router.get('/settel/:username/:groupname', transactionService.getSettelment);

module.exports = router;