const express = require("express");
const router = express.Router();
const {handleQuestProgress, handleCompletedQuest} = require("../../controllers/questProgressController");

router.get("/", handleCompletedQuest);
router.post("/", handleQuestProgress);

module.exports = router;