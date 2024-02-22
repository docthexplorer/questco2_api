const express = require("express");
const router = express.Router();
const handleRemoveQuest = require("../../controllers/deleteQuestController");

router.get("/:i", handleRemoveQuest );

module.exports = router;