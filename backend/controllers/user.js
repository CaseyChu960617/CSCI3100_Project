const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getProfile function
exports.getProfile = async (req, res) => {
    const uid = req.params['uid'];

    User.find({ _id: uid})
    .select("username firstname lastname email")
    .exec()
    .then(doc => {
        res.send(doc);
    })
};

// editProfile function
exports.editProfile = async (req, res) => {

};

// getChats function
exports.getChats = async (req, res) => {
    console.log("HI");
};

// follow function
exports.follow = async (req, res) => {
    console.log("HI");
};

// unfollow function
exports.unfollow = async (req, res) => {
    console.log("HI");
};


