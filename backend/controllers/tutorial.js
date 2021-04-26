const Tutorial = require("../models/tutorial");
const TutorialComment = require("../models/tutorialComment");
const Chapter = require("../models/chapter");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const { response } = require("express");

// getAllTutorials function
exports.getAllTutorials = async (req, res) => {

  Tutorial.find({ published: 1 })
    .sort({ lastModifiedAtDate: -1 })
    .select("_id author subject title description thumbnail lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
      //console.log(docs);
    });
};

exports.getLatestTutorials = async (req, res) => {
  Tutorial.find({ published: 1 })
    .sort({ lastModifiedAtDate: -1 })
    .limit(3)
    .select("_id author subject title description  thumbnail lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
      //console.log(docs);
    });
};

// getSubject function
exports.getSubject = async (req, res) => {

  Tutorial.find({ $and: [{ subject: req.params["subject_id"]}, { published: 1}] })
    .sort({ lastModifiedAtDate: -1 })
    .select("author subject title lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    });
};

// getOneTutorial function
exports.getOneTutorial = async (req, res) => {
  var populateQuery = [
    { path: "author", select: "_id username profileImage" },
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
      "_id title subject description thumbnail chapters published lastModified lastEditedAt createdAt"
    )
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      res.status(200).send(doc);
    });
};

// getOneChapter function
exports.getOneChapter = async (req, res) => {

  Chapter.findOne({ _id: req.params["chapter_id"] })
    .select("title content lastEditedAt createdAt")
    .exec()
    .then((doc) => {
      //console.log(doc);
      res.status(200).send(doc);
    });
};

// getUserTutorial function
exports.getMyTutorials = async (req, res) => {
  Tutorial.find({ author: req.params["user_id"] })
    .sort({ lastModifiedAtDate: -1 })
    .select("author subject title description thumbnail createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    });
};

// getUserTutorial function
exports.getUserTutorials = async (req, res) => {

  Tutorial.find({ $and: [{ author: req.params["user_id"]}, { published: 1}] })
    .sort({ lastModifiedAtDate: -1 })
    .select("author subject title description thumbnail createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    });
};

// getOneTutorial function
exports.getFollowingTutorials = async (req, res) => {
  const { following } = req.body;

  Tutorial.find({ author: { $in: following } })
    .sort({ lastModifiedAtDate: -1 })
    .select(
      "author subject title description thumbnail createdAt lastModifiedAt"
    )
    .populate("author", "_id username")
    .exec()
    .then((err, docs) => {
      if (err) res.status(400).send(err.message);
      else res.status(200).send(docs);
    });
};

// createTutorial function
exports.createTutorial = async (req, res) => {

  const { user_id, subject, title, description } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: err.message });
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
          lastModifiedAtDate: new Date().getTime(),
          published: false,
        },
        (err, doc) => {
          //console.log(err);
          if (err) 
          res.status(400).send(err.message);
          else 
            res.status(200).send(doc._id);
        }
      );
    } else res.status(400).send("User not found.");
  });
};

// createChapter function
exports.createChapter = async (req, res) => {

  const { tutorial_id, title, content } = req.body;

  var newChapter = new Chapter(
    {
      title: title,
      content: content,
      createdAt: new Date().toLocaleDateString("zh-HK"),
      lastEditedAt: new Date().toLocaleDateString("zh-HK"),
    },
    (err) => {
      if (err) {
        res.status(400).send(err.message);
      }
    }
  );

  newChapter.save();

  const update = {
    $push: { chapters: newChapter._id },
    $set: {
      lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
      lastModifiedAtDate: new Date().getTime(),
    },
  };

  Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err) => {
    if (err) res.status(400).send(err.message);
    else res.status(200).send("Success");
  });
};

// editTutorial function
exports.editTutorial = async (req, res) => {

  const {
    tutorial_id,
    title,
    subject,
    description,
    published,
    thumbnail,
  } = req.body;

  const update = {
    $set: {
      title: title,
      subject: subject,
      description: description,
      lastEditedAt: new Date().toLocaleDateString("zh-HK"),
      lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
      lastModifiedAtDate: new Date().getTime(),
      published: published,
      thumbnail: thumbnail,
    },
  };

  Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err, doc) => {
    if (err) res.status(400).send(err.message);
    else res.status(200).send("Sucess");
  });
};

// editChapter function
exports.editChapter = async (req, res) => {

  const { tutorial_id, chapter_id, title, content } = req.body;

  const update = {
    $set: {
      title: title,
      content: content,
      lastEditedAt: new Date().toLocaleDateString("zh-HK"),
    },
  };

  //console.log("title:", title);
  //console.log("content:", content);
  Chapter.findOneAndUpdate({ _id: chapter_id }, update, (err, doc) => {
    if (err) res.status(400).json({ error: "Bad request." });
  });

  Tutorial.findOneAndUpdate({ _id: tutorial_id }, 
    { $set: { lastModifiedAtDate: new Date().getTime() } }, 
    (err) => {
      //console.log(err)
      if (err)
        res.status(400).send(err.message);
      else
        res.status(200).send("Edit chapter sucessfully");
    });


};

// postComment function
exports.postComment = async (req, res) => {

  const { user_id, content, tutorial_id } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    //console.log(err);
    if (err) res.status(400).json({ error: "User not found!" });
    if (user) {
      var newComment = new TutorialComment(
        {
          author: new ObjectId(user_id),
          createdAt: new Date().toLocaleDateString("zh-HK"),
          content: content,
        },
        (err) => {
          //console.log(err)
          if (err) {
            res.status(400).send(err.message);
          }
        }
      );

      newComment.save((err) => {
        if (err)
          res.status(400).send(err.message);
      });

      const update = {
        $push: { comments: newComment._id },
        $set: {
          lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
          lastModifiedAtDate: new Date().getTime(),
        },
      };

      Tutorial.findOneAndUpdate({ _id: tutorial_id }, update, (err, doc) => {
        if (err) res.status(400).send(err.message);
        else res.status(200).send(doc);
      });
    }
  });
};

// deleteTutorial function

exports.deleteTutorial = async (req, res) => {
  
  const tutorial = await Tutorial.findOne({ _id: req.params["tutorial_id"] });

  if (tutorial) {
    tutorial.remove();

    res.status(200).json({
      message: "Thread successfully deleted.",
    });
  } else {
    res.status(400).send("Tutorial not found.");
  }
};

// deleteChapter function
exports.deleteChapter = async (req, res) => {
  
  const tutorial_id = req.params["tutorial_id"];
  const chapter_id = req.params["chapter_id"];

  const chapter = await Chapter.findOne({ _id: chapter_id });

  if (chapter) {
    chapter.remove();

    Tutorial.findOneAndUpdate(
      { _id: tutorial_id },
      { $pullAll: { chapters: [ObjectId(chapter._id)] } },
      (err, doc) => {
        if (err) res.status(400).json({ error: err.message });
        else res.status(200).send(doc);
      }
    );
  } else {
    res.status(400).send("Chapter not found.");
  }
};
