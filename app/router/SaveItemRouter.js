const express = require("express");
const router = express.Router();
const saveController = require("../controllers/SaveItemController");

router.post("/save-item", saveController.saveItem);

module.exports = router;
