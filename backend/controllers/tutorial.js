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
<<<<<<< Updated upstream
    console.log("HI");
=======

  const { uid, content, tutorial_id } = req.body;

  User.findById(uid, { lean: true }, (err, user) => {
    if (err) 
       res.status(400).json({ error: "User not found!" });
    if (user) {
        var newComment = new TutorialComment(
            {
                author: new ObjectId(uid),
                createdAt: new Date().getTime().toLocaleString(),
                content: content,
            },
            (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
                }
            }
        );

        newComment.save((err) => {
            if (err) res.status(400).json({ error: "Comment cannot be posted successfully." });
        });
        
        const update = { 
            $push: { comments: newComment._id }, 
            $set: { lastModifiedAt: new Date().getTime().toLocaleString() } 
        }

        Tutorial.findOneAndUpdate({ _id: tutorial_id }, update,
            (err, doc) => {
            if (err) 
                res.status(400).json({ error: err.message });
            else
                res.send(doc);  
        });
    }});
>>>>>>> Stashed changes
};

// deleteTutorial function
exports.deleteTutorial = async (req, res) => {
    console.log("HI");
};

// deleteChapter function
exports.deleteChapter = async (req, res) => {
    console.log("HI");
};


