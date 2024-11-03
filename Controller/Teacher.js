const TeacherModel = require("../Model/Teacher.js");
const UserModel = require("../Model/User");



exports.getTeacher = async (req, res) => {
    const { page = 1, q = '' } = req.query;
    pageNumber = (page)? page-1:0;
    
    let perPage = 4;
    let startPoint = pageNumber * perPage;
    const query = q ? { name: new RegExp(q, 'i') } : {};

    try {
        const TotalRecords = await TeacherModel.countDocuments()
        const TeacherData = await TeacherModel.find(query).
        skip(startPoint).
        limit(perPage);
        res.status(200).json({
            message: "All Teacherss",
            TeacherData,
            TotalRecords
        })

    } catch (error) {
        res.status(400).json(err);
    }
};

exports.getTeachers = async (req, res) => {
    const { id } = req.params;
    try {
        const TeacherData = await TeacherModel.find({"_id":id});
        res.status(200).json({
            message: "Student details",
            TeacherData
        })

    } catch (err) {
        res.status(400).json(err);
    }
};

exports.add = async (req, res) => {

    const { name, email, phone, password } = req.body;
    const image = req.file ? req.file.path : null

    try {

        const newUser = new UserModel({
            email,
            password,
            role: "Teacher"
        })

        const newTeacherData = await newUser.save();

        if (newTeacherData) {
            const newTeacher = new TeacherModel({
                name,
                email,
                phone,
                user: newTeacherData._id,
                image
            })

            const data = await newTeacher.save();


            res.status(201).json({
                message: "Teacher added!",
                data
            })
        } else {

            res.status(400).json({
                message: "Ops! Sorry please try it some time later.",
                data
            })

        }


    } catch (error) {
        res.status(400).json(error.message)
    }

}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {

        const data = await TeacherModel.findByIdAndUpdate(id, { name, email, phone });
        res.status(200).json({
            message: "Teachers data updated",
            data
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await TeacherModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Teachers data deleted",
            data

        })
    } catch (error) {
        res.status(400).json(error);
    }
}

