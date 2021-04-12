const Tutorial = require("../models/tutorial");
const TutorialComment = require("../models/tutorialComment");
const Chapter = require("../models/chapter");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const { response } = require("express");

// getAllTutorials function
exports.getAllTutorials = async (req, res) => {
  Tutorial.find()
    .sort({ lastModifiedAt: -1 })
    .select("_id author subject title description lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
      console.log(docs);
    });
};

exports.getLatestTutorials = async (req, res) => {
  Tutorial.find()
    .sort({ lastModifiedAt: -1 })
    .limit(3)
    .select("_id author subject title description lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
      console.log(docs);
    });
};

// getSubject function
exports.getSubject = async (req, res) => {
  Tutorial.find({ subject: req.params["subject_id"] })
    .sort({ lastModifiedAt: -1 })
    .select("author subject title lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getOneTutorial function
exports.getOneTutorial = async (req, res) => {
  var populateQuery = [
    { path: "author", select: "_id username" },
    {
      path: "comments",
      select: "content createdAt",
      populate: {
        path: "author",
        select: "_id username",
      },
    },
    { path: "chapters", select: "_id title content lastModifiedAt" },
  ];

  Tutorial.findOne({ _id: req.params["tutorial_id"] })
    .select(
      "_id title subject description chapters lastModified lastEditedAt createdAt"
    )
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      res.send(doc);
    });
};

// getOneChapter function
exports.getOneChapter = async (req, res) => {
  Chapter.findOne({ _id: req.params["chapter_id"] })
    .select("_id title content lastEditedAt createdAt")
    .exec()
    .then((doc) => {
      res.send(doc);
    });
};

// getUserTutorial function
exports.getUserTutorials = async (req, res) => {
  Tutorial.find({ author: req.params["user_id"] })
    .sort({ lastModifiedAt: -1 })
    .select("author subject title description createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getOneTutorial function
exports.getFollowingTutorials = async (req, res) => {
  const { following } = req.body;

  Tutorial.find({ author: { $in: following } })
    .sort({ lastModifiedAt: -1 })
    .select("author category title createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((err, docs) => {
      if (err) res.status(400).json({ error: err.message });
      else res.send(docs);
    });
};

// createTutorial function
exports.createTutorial = async (req, res) => {
  const { user_id, subject, title, description } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: "User not found!" });
    if (user) {
      Tutorial.create(
        {
          author: user._id,
          title: title,
          subject: subject,
          description: description,
          createdAt: new Date().toLocaleString("zh-HK"),
          lastEditedAt: new Date().toLocaleString("zh-HK"),
          lastModifiedAt: new Date().toLocaleString("zh-HK"),
          published: false,
        },
        (err, doc) => {
          if (err) res.status(400).json({ error: "Bad request." });
          else res.send(doc._id);
        }
      );
    } else res.status(400).json({ error: "User not found." });
  });
};

// createChapter function
exports.createChapter = async (req, res) => {
  const { user_id, tutorial_id, title, content } = req.body;

  var newChapter = new Chapter(
    {
      title: title,
      content: content,
      createdAt: new Date().toLocaleDateString("zh-HK", options),
      lastEditedAt: new Date().toLocaleDateString("zh-HK", options),
    },
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
    }
  );

  newChapter.save((err) => {
    if (err)
      res.status(400).json({ error: "Comment cannot be posted successfully." });
  });

  const update = {
    $push: { chapers: newChapter._id },
    $set: {
      lastModifiedAt: new Date().getTime().toLocaleDateString("zh-HK", options),
    },
  };

  Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err, doc) => {
    if (err) res.status(400).json({ error: err.message });
    else res.send(doc);
  });
};

// editTutorial function
exports.editTutorial = async (req, res) => {
  const { tutorial_id, title, subject, published } = req.body;

  const update = {
    $set: {
      title: title,
      subject: subject,
      lastEditedAt: new Date().toLocaleDateString("zh-HK"),
      lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
      published: published,
    },
  };

  Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err, doc) => {
    if (err) res.status(400).json({ error: "Bad request." });
    else res.send(doc);
  });
};

// editChapter function
exports.editChapter = async (req, res) => {
  const { chapter_id, title, content } = req.body;

  const update = {
    $set: {
      title: title,
      content: content,
      lastEditedAt: new Date().getTime().toLocaleDateString("zh-HK", options),
    },
  };

  Chapter.findOneAndUpdate({ _id: chapter_id }, update, (err, doc) => {
    if (err) res.status(400).json({ error: "Bad request." });
    else res.send(doc);
  });
};

// postComment function
exports.postComment = async (req, res) => {
  const { user_id, content, tutorial_id } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: "User not found!" });
    if (user) {
      var newComment = new TutorialComment(
        {
          author: new ObjectId(user_id),
          createdAt: new Date().toLocaleDateString("zh-HK"),
          content: content,
        },
        (err, data) => {
          if (err) {
            res.status(400).json({ error: err.message });
          }
        }
      );

      newComment.save((err) => {
        if (err)
          res
            .status(400)
            .json({ error: "Comment cannot be posted successfully." });
      });

      const update = {
        $push: { comments: newComment._id },
        $set: {
          lastModifiedAt: new Date()
            .getTime()
            .toLocaleDateString("zh-HK", options),
        },
      };

      Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err, doc) => {
        if (err) res.status(400).json({ error: err.message });
        else res.send(doc);
      });
    }
  });
};

// deleteTutorial function
exports.deleteTutorial = async (req, res) => {
  const { tutorial_id } = req.body;
  console.log(req.body);
  Tutorial.findById(tutorial_id, (err, doc) => {
    doc.remove();
    res.status(200).json({
      discussionThread: doc,
      message: "Thread successfully deleted.",
    });
  });
};

// deleteChapter function
exports.deleteChapter = async (req, res) => {
  const { tutorial_id, chapter_id } = req.body;

  Chapter.findById(chapter_id, (err, doc) => {
    doc.remove();
    res.status(200).json({
      discussionThread: doc,
      message: "Thread successfully deleted.",
    });
  });

  Tutorial.findOneAndUpdate(
    { _id: tutorial_id },
    { $pullAll: { chapters: chapter_id } },
    (doc, err) => {
      if (err) res.status(400).json({ error: err.message });
      else res.send(doc);
    }
  );
};
