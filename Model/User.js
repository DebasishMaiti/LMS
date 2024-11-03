const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  try {

    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {

    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_secret);
    return token;
  } catch (err) {
    console.log(err);
  }
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;