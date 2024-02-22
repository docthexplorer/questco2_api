const express = require("express");
const router = express.Router();
const handleUserQuests = require("../../controllers/userQuestsController");

router.get("/", handleUserQuests);

module.exports = router;