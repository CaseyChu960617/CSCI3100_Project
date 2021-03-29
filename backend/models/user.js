const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: Number },
    profileImage: { type: String },
    activation: { type: Boolean, default: false },
    token: { type: String },
}, { collection: 'users'});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;