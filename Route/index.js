const express = require("express");

const router = express.Router();
const {auth, isTeacher, isStudent, isAdmin} = require("../Middleware/Auth")
const AdminRouts = require("./Admin");
const TeachersRouts = require("./Teacher");
const StudentRouts = require("./Student");
const UserRouts = require("./User")
const AuthRouts = require("./Auth");
//const ContactRoute = require("./Contact")

router.use("/Teacher", [auth, isTeacher], TeachersRouts);

router.use("/Student", [auth, isStudent], StudentRouts);

router.use("/Admin", [auth,isAdmin], AdminRouts)

router.use("/User", UserRouts);

router.use("/auth",AuthRouts);
//router.use("/contact",ContactRoute);

module.exports = router;