const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    gender: { type: Number },
    profileImage: { type: String },
    activation: { type: Boolean, default: false },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, { collection: 'users'});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;