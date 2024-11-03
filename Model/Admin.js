const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;