const express = require('express');
const router = express.Router();
const gamesController = require('./games.controller');





router.get('/:gameNumber', gamesController.getSolution);

module.exports = router;