const express = require('express');
const AdminController = require('../Controller/Admin');
const router = express.Router();

router.get('/', AdminController.getAdmin);

router.post('/add', AdminController.add);

router.put("/update/:id", AdminController.update);

router.delete('/delete/:id', AdminController.delete);

module.exports = router;