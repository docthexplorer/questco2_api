const express = require("express");
const router = express.Router();
const questsDataController = require("../../controllers/questsDataController");

router.get("/", questsDataController);

module.exports = router;