const express = require("express");
const router = express.Router();
const { handleNewUserUniqueness, handleNewUserRegistration} = require("../controllers/registerController");

router.get("/:findUser", handleNewUserUniqueness);
router.post("/", handleNewUserRegistration);
 
module.exports = router;