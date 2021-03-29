const Tutorial = require("../models/tutorial");
const TutorialComment = require("../models/tutorialComment");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
const { Mongoose } = require("mongoose");

// getAllThread function
exports.getAllTutorials = async (req, res) => {

};

// getOneThread function
exports.getOneTutorial = async (req, res) => {
  
};

// editThread function
exports.editTutorial = async (req, res) => {};

// postComment function
exports.postComment = async (req, res) => {
  
};

// deleteThread function
exports.deleteTutorial = async (req, res) => {
 
};

// createThread function
exports.createTutorial = async (req, res) => {
 

  /*discussionThread.create({
        author: uid,
        category: category,
        createdAt: new Date().getTime(),
        title: title,
        content: content
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: "Bad request."});
        }
        else
            console.log(data);
            res.status(200).json({ message: "Thread created successfully."})
    })*/
};
