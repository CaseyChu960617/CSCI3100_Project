const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: Number },
    reset_token: { type: String },
    profileImage: { type: String },
   //following:,
    //"notifications": [],
   // "groups": [],
   // "posts": []
}, { collection: 'users'});

const userModel = mongoose.model('userSchema', userSchema);

module.exports = userModel;