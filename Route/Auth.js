const express = require("express");
const router = express.Router();
const authController = require("../Controller/Auth");


router.post('/login', authController.login)
module.exports = router