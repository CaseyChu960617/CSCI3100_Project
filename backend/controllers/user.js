const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// getProfile function
exports.getProfile = async (req, res) => {
  const user_id = req.params["user_id"];
  try {
    User.findOne({ _id: user_id })
      .select("username firstname lastname email gender following profileImage activation")
      .exec()
      .then((doc) => {
        console.log(doc);
        res.send(doc);
      });
  }
  catch(err) {
    res.status(400).json({ error: err.message});
  }
};

// editProfile function
exports.editProfile = async (req, res) => {

    const { user_id, firstname, lastname, gender, username } = req.body;
    console.log(user_id)
    console.log(username);

    const user = await User.findOne({ _id: user_id }, (err) => {
        if (err)
            res.status(400).json({ error: err.message });
    })

    if (!user) {
      res.status(400).json({ error: "User not found."});
    } else {
    console.log(user);
    const otherUser = await User.findOne({ username: username }, (err) => {
        if (err)
            res.status(400).json({ error: err.message });
    })

    if (!otherUser)  {
        user.username = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.gender = gender;
        user.save((err) => {
          if (err)
            res.status(400).json({ error: err.message });
        });
        // Generate a token if password is matched.
        const accessToken = jwt.sign({
            user_id: user._id
            },
            process.env.JWT_ACC_SECRET,
            {expiresIn: '20m'});
        
        res.status(200).send({
            accessToken: accessToken,
            user_id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            gender: user.gender,
            activation: user.activation,
            following: user.following,
            profileImage: user.profileImage
        });
    } else {
        if (otherUser._id.equals(user._id)) {
        user.username = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.gender = gender;
        user.save((err) => {
          if (err)
            res.status(400).json({ error: err.message });
        });
        // Generate a token if password is matched.
        const accessToken = jwt.sign({
            user_id: user._id
            },
            process.env.JWT_ACC_SECRET,
            {expiresIn: '20m'});
        
        res.status(200).send({
            accessToken: accessToken,
            user_id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            gender: user.gender,
            activation: user.activation,
            following: user.following,
            profileImage: user.profileImage
        });
        } else
        res.status(400).json({ error: "User with this username existed."});
    }
  }
};

// follow function
exports.follow = async (req, res) => {

  const { my_user_id, follow_id } = req.body;

  console.log(my_user_id);
  User.findOneAndUpdate({ _id: my_user_id }, 
    { $push: { following: follow_id } }, 
    (err) => {
    if (err) res.status(400).json({ error: err.message });
  });

  const user = await User.findOne({ _id: my_user_id }).select("following");
  res.send(user.following);
};

// unfollow function
exports.unfollow = async (req, res) => {

  const { my_user_id, follow_id } = req.body;
  console.log(my_user_id);
  User.findOneAndUpdate({ _id: my_user_id }, 
    { $pullAll: { following: [ObjectId(follow_id)] } }
    , (err) => {
    if (err)
      res.status(400).json({ error: err.message });
  });

  const user = await User.findOne({ _id: my_user_id }).select("following");
  res.send(user.following);
};

// updateProPic function
exports.updateProPic = async (req, res) => {
  const { my_user_id, profileImage } = req.body;

  User.findOneAndUpdate({ _id: my_user_id }, { profileImage: profileImage }, (err) => {
    if (err) res.status(400).json({ error: "User not exist" });
  });

  const user = await User.findOne({ _id: my_user_id }).select("profileImage");
  res.send(user.profileImage);
};

exports.resetPassword = async (req, res) => {
  const { user_id, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ _id: user_id });

  if (!user) res.status(400).json({ error: "User does not existed" });
  else {
    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      user.save((err) => {
        if (err) res.status(400).json({ error: "Password cannot be reset successfully." });
      });
      res.status(200).send({ message: "success" });
    }
  }
};
