const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// getProfile function
exports.getProfile = async (req, res) => {
  try {
    User.findOne({ _id: new ObjectId(req.params["user_id"]) })
      .select(
        "username firstname lastname email gender following profileImage activation"
      )
      .exec()
      .then((doc) => {
         res.status(200).send(doc);
      });
  } catch (err) {
      res.status(400).send({ message: "user_id is not valid." });
  }
};

// editProfile function
exports.editProfile = async (req, res) => {
  const { user_id, firstname, lastname, gender, username } = req.body;


  if (email == "" || password == "")
      res.status(400).send({ message: "Email or password cannot be emptied."});

  if (username == "")
      res.status(400).send({ message: "Username cannot be emptied."});

  if (gender < 1 || gender > 3)
      res.status(400).send({ message: "Invalid gender."});

  const user = await User.findOne({ _id: user_id }, (err) => {
    if (err) res.status(400).send({ message: err.message });
  });

  if (!user) {
    res.status(400).send({ message: "User not found." });
  } else {
    // Find if there are other user using the new username
    const otherUser = await User.findOne({ username: username }, (err) => {
      if (err) res.status(400).send({ message: err.message });
    });

    if (!otherUser) {
      user.username = username;
      user.firstname = firstname;
      user.lastname = lastname;
      user.gender = gender;
      user.save((err) => {
        if (err) res.status(400).send({ message: err.message });
      });

      // Renew token when finish editing profile.
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
    } else {
      if (otherUser._id.equals(user._id)) {
        user.username = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.gender = gender;
        user.save((err) => {
          if (err) res.status(400).send({ message: err.message });
        });
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
      } else
        res.status(400).send({ message: "User with this username existed." });
    }
  }
};

// follow function.
exports.follow = async (req, res) => {
  const { my_user_id, follow_id } = req.body;

  User.findOneAndUpdate(
    { _id: my_user_id },
    { $push: { following: follow_id } },
    (err) => {
      if (err) res.status(400).send({ message: err.message });
    }
  );

  const user = await User.findOne({ _id: my_user_id }).select("following");
  res.status(200).send(user.following);
};

// unfollow function.
exports.unfollow = async (req, res) => {
  const { my_user_id, follow_id } = req.body;
  //  console.log(my_user_id);
  User.findOneAndUpdate(
    { _id: my_user_id },
    { $pullAll: { following: [ObjectId(follow_id)] } },
    (err) => {
      if (err) res.status(400).send({ message: err.message });
    }
  );

  const user = await User.findOne({ _id: my_user_id }).select("following");
  res.status(200).send(user.following);
};

// updateProPic function.
exports.updateProPic = async (req, res) => {
  const { my_user_id, profileImage } = req.body;

  User.findOneAndUpdate(
    { _id: my_user_id },
    { profileImage: profileImage },
    (err) => {
      if (err) res.status(400).send({ message: err.message });
    }
  );

  const user = await User.findOne({ _id: my_user_id }).select("profileImage");
  res.status(200).send(user.profileImage);
};

exports.resetPassword = async (req, res) => {
  const { user_id, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ _id: user_id });

  // If user is not found.
  if (!user) res.status(400).send({ message: err.message });
  else {
    // compare the input with the old password.
    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      user.save((err) => {
        if (err) res.status(400).send({ message: err.message });
      });
      res.status(200).send({ message: "Password has been reset successfully" });
    } else res.status(400).send({ message: "Old password is not matched." });
  }
};

exports.getFollower = async (req, res) => {
  var populateQuery = [
    { path: "following", select: "_id username profileImage" },
  ];

  try {
    User.findOne({ _id: new ObjectId(req.params["user_id"]) })
      .select("following")
      .populate(populateQuery)
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
