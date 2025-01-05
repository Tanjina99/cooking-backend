const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/author", userController.getAllAuthor);
module.exports = router;
