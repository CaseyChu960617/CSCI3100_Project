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

// follow function
exports.follow = async (req, res) => {
    const { my_id, follow_id } = req.body;

    User.findOneAndUpdate({ _id: my_id }, 
        { $push: { following: follow_id } }, 
        (err) => {
          if (err) 
            res.status(400).json({ error: err.message });
      });

    const user = await User.findOne({ _id: my_id}).select('following');
    console.log(user);
    res.send(user.following);
};

// unfollow function
exports.unfollow = async (req, res) => {
    const { my_id, follow_id } = req.body;

    console.log(my_id);
    console.log(follow_id);
    User.findOneAndUpdate({ _id: my_id },
         { $pull: { following: { $in: [ObjectId(follow_id)]} } }, 
         (doc, err) => {
        //if (err)
            //res.status(400).json({ error: err.message });
    });

    const user = await User.findOne({ _id: my_id}).select('following');
    res.send(user.following);
};


