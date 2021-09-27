'use strict';

const express = require('express');
const router = new express.Router();
const userService = require('../service/user.service');
const groupsService = require('../service/groups.service');


router.post('/create', userService.createUser);
router.get('/:username/get', userService.getUser);

router.post('/:username/group/create', groupsService.createGroup);
router.get('/groups', groupsService.getAllGroup);
router.get('/:name/groups/', groupsService.getGroup);
router.get('/add/:username/groups/:name', groupsService.addMember);


module.exports = router;