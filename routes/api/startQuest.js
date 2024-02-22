const express = require("express");
const router = express.Router();
const handleStartQuest = require("../../controllers/startQuestController");

router.get("/:id", handleStartQuest);

module.exports = router;