const express = require('express');
const router = express.Router();
const teamsController = require('./team.controller');

router.get('/', teamsController.getTeams);

module.exports = router;