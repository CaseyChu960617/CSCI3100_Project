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
  const {uid, firstname, lastname, gender, username} = req.body;
   {
        User.findOneAndUpdate({ _id: uid }, 
            { lastname: lastname, firstname: firstname, username: username,
            gender: gender}, {new : true},
            (err, data) => {
            if (err) 
                res.status(400).json({ error: err.message });
            else {
                console.log(data);
                res.send(data);
            }
        });
    }
      
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

    console.log(my_id);
    console.log(profileImage);
    User.findOneAndUpdate({ _id: my_id },
         { profileImage: profileImage }, 
         (err) => {
        if (err)
            res.status(400).json({ error: "User not exist" });
    });

    const user = await User.findOne({ _id: my_id}).select('profileImage');
    res.send(user.profileImage);
};



