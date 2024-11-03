const userModel = require("../Model/User");

exports.getUser = async (req,res)=>{
    try {
        const UserData = await userModel.find();
        res.status(200).json({
            message: "All Users",
            UserData
        })
        
    } catch (error) {
        res.status(400).json(err);
    }
};

exports.update = async(req,res)=>{
    const {id} = req.params;
    const {name, email, phone} = req.body;
    try {
 
        const data = await userModel.findByIdAndUpdate(id,{name, email, phone});
        res.status(200).json({
            message:"User data updated",
            data
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
    try {
 
        const data = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"User data deleted",
            data
          
        })
    } catch (error) {
        res.status(400).json(error);
    }
}