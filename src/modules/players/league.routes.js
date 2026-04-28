const express = require("express");
const router = express.Router();
const leaguesController = require("./league.controller");

router.get("/", leaguesController.getLeagues);

module.exports = router;