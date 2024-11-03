const studentModel = require("../Model/Student.js");
const UserModel = require("../Model/User.js");

exports.getStudents = async (req, res) => {
    const { page = 1, q = '' } = req.query;
    const pageNumber = page ? page - 1 : 0;
    const perPage = 4;
    const startPoint = pageNumber * perPage;
    const query = q ? { name: new RegExp(q, 'i') } : {};

    try {
        let totalRecords = await studentModel.countDocuments(query);
        const StudentData = await studentModel.find(query)
            .skip(startPoint)
            .limit(perPage);
        res.status(200).json({
            message: "All Students",
            StudentData,
            totalRecords
        });
    } catch (err) {
        res.status(400).json(err);
    }
};


exports.getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const StudentData = await studentModel.find({ "_id": id });
        res.status(200).json({
            message: "Student details",
            StudentData
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
            role: "student"
        })

        const newStudentData = await newUser.save();

        if (newStudentData) {
            const newStudent = new studentModel({
                name,
                email,
                phone,
                user: newStudentData._id,
                image
            })

            const data = await newStudent.save();


            res.status(200).json({
                message: "student added!",
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

        const data = await studentModel.findByIdAndUpdate(id, { name, email, phone });
        res.status(200).json({
            message: "Students data updated",
            data
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await studentModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Student data deleted",
            data
        })
    } catch (error) {
        res.status(400).json(error);
    }
}
