const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
  const {uid, firstname, lastname, gender, username} = req.body;
        User.findOne({ username: username }, (err, user) => {
            if (user)
                res.status(400).json({ error: "User with this username already existed."});
            else {
                User.findOneAndUpdate({ _id: uid }, 
                    { username: username, 
                      lastname: lastname, 
                      firstname: firstname, 
                      username: username,
                      gender: gender
                    }, {new : true},
                    (err, doc) => {
                    if (err) 
                        res.status(400).json({ error: err.message });
                    else {
                        res.send(doc);
                    }
                });
            }
        })     
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
         { $pullAll: { following: [ObjectId(follow_id)] } }, 
         (doc, err) => {
        //if (err)
            //res.status(400).json({ error: err.message });
    });

    const user = await User.findOne({ _id: my_id}).select('following');
    res.send(user.following);
};

// updateProPic function
exports.updateProPic = async (req, res) => {

    const { my_id, profileImage } = req.body;

    User.findOneAndUpdate({ _id: my_id },
         { profileImage: profileImage }, 
         (err) => {
        if (err)
            res.status(400).json({ error: "User not exist" });
    });

    const user = await User.findOne({ _id: my_id}).select('profileImage');
    res.send(user.profileImage);
};

exports.resetPassword = async (req, res) => {
    const { uid, oldPassword, newPassword } = req.body;

    const hashedOldPassword = await bcrypt.hash(oldPassword, 10)
    const user = await User.findOne({ _id: uid },
         (err) => {
            res.status(400).json({ error: err.message });
         });

    if (!user)
        res.status(400).json({ error: "User does not existed" });
    else {
        if (user.password === hashedOldPassword) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            user.save((err) => {
                if (err) 
                    res.status(400).json({ error: "Password cannot be reset successfully." });
            });
        }
    }
};



