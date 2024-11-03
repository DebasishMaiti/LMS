const AdminModel = require("../Model/Admin");
const UserModel = require('../Model/User');

exports.getAdmin = async (req, res)=>{
    try {
        const AdminData = await AdminModel.find();
        res.status(200).json({
            massage:"All Admins",
            AdminData
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.add = async (req, res)=>{
    const {name, email, phone, password} = req.body;
    try {
        const newUser = new UserModel({
            email,
            password,
            role:'Admin'
        })
        const newAdminData = await newUser.save();
        if(newAdminData){
            const newAdmin = new AdminModel({
                name,
                email,
                phone,
                password,
                user:newAdminData._id
            })
            const data = await newAdmin.save();
            res.status(200).json({
                massage:'Admin data Added',
                data
    
            })
        }else{
            res.status(400).json({
                massage:'Admin was not added',
                data
            })
        }
        

    } catch (error) {
        res.status(400).json(error.massage)
    }
}

exports.update = async (req, res)=>{
    const {id} = req.params;
    const {name, email, phone} = req.body;
    try {
        const data = await AdminModel.findByIdAndUpdate(id,{name, email, phone});
        res.status(200).json({
            massage:'Admin data Upadated',
            data
        })
        
    } catch (error) {
        res.status(400).json(error.massage);
    }
}
 

exports.delete = async (req, res)=>{
    const {id} = req.params;
    try {
        const data = await AdminModel.findByIdAndDelete(id);
        res.status(200).json({
            massage:'Admin data Deleted',
            data
        })
    } catch (error) {
        res.status(400).json(error.massage);
    }
}