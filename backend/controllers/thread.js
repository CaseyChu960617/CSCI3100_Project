const Thread = require("../models/thread");
const ThreadComment = require("../models/threadComment");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const options = { weekday: "long", year: "numeric", month: "numberic", day: "numeric" };

// getAllThread function
exports.getAllThreads = async (req, res) => {
  Thread.find()
    .sort({ lastModifiedAt: -1 })
    .select("author category title createdAt lastEditedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

exports.getLatestThreads = async (req, res) => {
  Thread.find()
    .sort({ lastModifiedAt: -1 })
    .limit(3)
    .select("author category title createdAt lastEditedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getCategory function
exports.getCategory = async (req, res) => {
  console.log("sdsd");
  Thread.find({ category: req.params["category_id"] })
    .sort({ lastModifiedAt: -1 })
    .select("author category title createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getOneThread function
exports.getOneThread = async (req, res) => {
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
  ];

  Thread.findById(req.params["thread_id"])
    .select("author title content comments createdAt lastModifiedAt")
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      res.send(doc);
    });
};

// getMyThreads function
exports.getUserThreads = async (req, res) => {
  Thread.find({ author: req.params["_id"] })
    .sort({ lastModifiedAt: -1 })
    .select("author category title createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getFollowingThreads function
exports.getFollowingThreads = async (req, res) => {
  const { following } = req.body;

  Thread.find({ author: { $in: following } })
    .sort({ lastModifiedAt: -1 })
    .select("author category title createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((err, docs) => {
      if (err) res.status(400).json({ error: err.message });
      else res.send(docs);
    });
};

// createThread function
exports.createThread = async (req, res) => {
  const { user_id, category, title, content } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: "User not found!" });

    if (user) {
      console.log(user);
      Thread.create(
        {
          author: user._id,
          category: category,
          title: title,
          content: content,
          createdAt: new Date().getTime().toLocaleDateString("zh-HK", options),
          lastEditedAt: new Date().getTime().toLocaleDateString("zh-HK", options),
          lastModifiedAt: new Date().getTime().toLocaleDateString("zh-HK", options),
        },
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: "Bad request." });
          } else console.log(data);
        }
      );
    } else res.status(400).json({ error: "User not found." });
  });
};

// editThread function
exports.editThread = async (req, res) => {
  const { thread_id, title, content } = req.body;

  const update = {
    $set: { title: title, content: content, lastEditedAt: new Date().getTime().toLocaleDateString("zh-HK", options), lastModifiedAt: new Date().getTime().toLocaleDateString("zh-HK", options) },
  };

  Thread.findOneAndUpdate({ _id: thread_id }, update, (err, doc) => {
    if (err) res.status(400).json({ error: "Bad request." });
    else res.send(doc);
  });
};

// postComment function
exports.postComment = async (req, res) => {
  const { user_id, content, thread_id } = req.body;

  User.findById(user_id, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: "User not found!" });
    if (user) {
      var newComment = new ThreadComment(
        {
          author: new ObjectId(user_id),
          createdAt: new Date().getTime().toLocaleDateString("zh-HK", options),
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
        $set: { lastModifiedAt: new Date().getTime().toLocaleDateString("zh-HK", options) },
      };

      Thread.findOneAndUpdate({ _id: thread_id }, update, (err, doc) => {
        if (err) res.status(400).json({ error: err.message });
        else res.send(doc);
      });
    }
  });
};

// deleteThread function
exports.deleteThread = async (req, res) => {
  const { thread_id } = req.body;

  Thread.findById(thread_id, (err, doc) => {
    doc.remove();
    res.status(200).json({
      discussionThread: doc,
      message: "Thread successfully deleted.",
    });
  });
};
