const UserModel = require("../Model/User");

// exports.login = async (req, res) => {

//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             res.status(404).json({
//                 "massage": "user invalid"
//             });
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password);

//         if (!passwordCompare) {
//             return res.status(500).json(
//                 {
//                     "meessage": " Invaild User details !",

//                 }
//             )
//         }


//         res.status(200).json({
//             "massage": "login successful"
//         })

//     } catch (err) {
//         res.status(401).json(
//             {
//                 meessage: err
//             }
//         )
//     }
// }


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by username
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare password using User model method
        const passwordMatch = await  user.comparePassword(password);
        if (passwordMatch) {
            const token = await user.generateAuthToken();
            res.status(200).send({
                user,
                token
            })
        } else {
            res.status(401).send('Invalid password');
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};