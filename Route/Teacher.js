const express = require("express");
const TeacherController = require("../Controller/Teacher")
const {TeacherUpload} = require("../Middleware/TeacherUpload")
const router = express.Router();

router.get("/", TeacherController.getTeacher);
router.get("/details/:id", TeacherController.getTeachers);

router.post("/add", TeacherUpload.single("image"), TeacherController.add);

router.put("/update/:id", TeacherController.update);

router.delete("/delete/:id", TeacherController.delete);

module.exports = router;