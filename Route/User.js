const express = require("express");
const UserController = require("../Controller/User")
const router = express.Router();

router.get("/", UserController.getUser);

router.put("/update/:id", UserController.update);

router.delete("/delete/:id", UserController.delete);

module.exports = router;