const jwt = require("jsonwebtoken");


exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({
                message: "Please provide authorization token"
            })

        } else {

            const tokenData = await jwt.verify(token, process.env.JWT_secret);

            if (!tokenData._id) {

                res.status(401).json({
                    message: "invalid token"
                })

            } else {
                req.userId = tokenData._id;
                req.role = tokenData.role;
                next()
            }
        }

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.isTeacher = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({
                message: "Please provide authorization token"
            })

        } else {

            const tokenData = await jwt.verify(token, process.env.JWT_secret);

            if (tokenData.role && tokenData.role == "Teacher" || tokenData.role && tokenData.role == "Admin") {


                next()
            } else {
                // res.status(401).json({

                // })
                const err = new Error('Unauthorized');
                err.status = 401;
                next(err); // Pass the error to the error handler

            }
        }

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({
                message: "Please provide authorization token"
            })

        } else {

            const tokenData = await jwt.verify(token, process.env.JWT_secret);

            if (tokenData.role && tokenData.role == "student" || tokenData.role && tokenData.role == "Admin") {


                next()
            } else {
                // res.status(401).json({

                // })
                const err = new Error('Unauthorized');
                err.status = 401;
                next(err); // Pass the error to the error handler

            }
        }

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }

}

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            res.status(401).json({
                message: 'Please provide Authorization Token'
            })
        } else {
            const tokenData = await jwt.verify(token.process.env.JWT_secret);

            if (tokenData.role && tokenData.role == "Admin") {
                next()
            } else {
                const err = new Error('Unauthorized');
                err.status = 401;
                next(err);
            }
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}
