    const Tutorial = require("../models/tutorial");
const TutorialComment = require("../models/tutorialComment");
const Chapter = require("../models/chapter");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllTutorials function
exports.getAllTutorials = async (req, res) => {
    Tutorial.find()
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getCategory function
exports.getCategory = async (req, res) => {
    Tutorial.find({category: req.params['category_id']})
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getOneTutorial function
exports.getOneTutorial = async (req, res) => {
    console.log("HI");
};

// getOneChapter function
exports.getOneChapter = async (req, res) => {
    console.log("HI");
};

// getOneTutorial function
exports.getMyTutorials = async (req, res) => {
    console.log("HI");
};

// getOneTutorial function
exports.getFollowingTutorials = async (req, res) => {
    console.log("HI");
};

// createTutorial function
exports.createTutorial = async (req, res) => {
    console.log("HI");
};

// createChapter function
exports.createChapter = async (req, res) => {
    console.log("HI");
};

// editTutorial function
exports.editTutorial = async (req, res) => {
    console.log("HI");
};

// editChapter function
exports.editChapter = async (req, res) => {
    console.log("HI");
};

// postComment function
exports.postComment = async (req, res) => {
    console.log("HI");
};

// deleteTutorial function
exports.deleteTutorial = async (req, res) => {
    console.log("HI");
};

// deleteChapter function
exports.deleteChapter = async (req, res) => {
    console.log("HI");
};


