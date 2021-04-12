const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// getProfile function
exports.getProfile = async (req, res) => {
  const user_id = req.params["user_id"];

  User.find({ _id: user_id })
    .select("username firstname lastname email")
    .exec()
    .then((doc) => {
      res.send(doc);
    });
};

// editProfile function
exports.editProfile = async (req, res) => {
  const { user_id, firstname, lastname, gender, username } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (user) res.status(400).json({ error: "User with this username already existed." });
    else {
      User.findOneAndUpdate({ _id: user_id }, { username: username, lastname: lastname, firstname: firstname, username: username, gender: gender }, { new: true }, (err) => {
        if (err) res.status(400).json({ error: err.message });
      });
    }
  });

  const user = await User.findOne({ user_id }).populate({ path: "following", select: "_id" }).lean();

  // If not exist, handle the error.
  if (!user) {
    return res.status(400).send({ status: "error", error: "Invalid email" });
  } else {
    // Generate a token if password is matched.
    const accessToken = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.JWT_ACC_SECRET,
      { expiresIn: "20m" }
    );

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
      profileImage: user.profileImage,
    });
  }
};

// follow function
exports.follow = async (req, res) => {
  const { my_id, follow_id } = req.body;

  User.findOneAndUpdate({ _id: my_id }, { $push: { following: follow_id } }, (err) => {
    if (err) res.status(400).json({ error: err.message });
  });

  const user = await User.findOne({ _id: my_id }).select("following");
  console.log(user);
  res.send(user.following);
};

// unfollow function
exports.unfollow = async (req, res) => {
  const { my_id, follow_id } = req.body;

  User.findOneAndUpdate({ _id: my_id }, { $pullAll: { following: [ObjectId(follow_id)] } }, (doc, err) => {
    //if (err)
    //res.status(400).json({ error: err.message });
  });

  const user = await User.findOne({ _id: my_id }).select("following");
  res.send(user.following);
};

// updateProPic function
exports.updateProPic = async (req, res) => {
  const { my_id, profileImage } = req.body;

  User.findOneAndUpdate({ _id: my_id }, { profileImage: profileImage }, (err) => {
    if (err) res.status(400).json({ error: "User not exist" });
  });

  const user = await User.findOne({ _id: my_id }).select("profileImage");
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
