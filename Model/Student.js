const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    image: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

const studentModel = mongoose.model("Student", StudentSchema);

module.exports = studentModel