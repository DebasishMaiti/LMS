const express = require("express");
const {StudentUpload} = require("../Middleware/StudentUpload")
const StudentController = require("../Controller/Student");
const router = express.Router();

 
router.get("/", StudentController.getStudents);
router.get('/details/:id', StudentController.getStudent)

router.post("/add", StudentUpload.single("image"), StudentController.add);

router.put("/update/:id", StudentController.update);

router.delete("/delete/:id", StudentController.delete);

module.exports = router;