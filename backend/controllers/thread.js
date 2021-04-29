const Thread = require("../models/thread");
const ThreadComment = require("../models/threadComment");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");


// getAllThread function.
exports.getAllThreads = async (req, res) => {
  try { 
    // Get all threads without filtering and sort by last edited time.
    Thread.find()
      .sort({ lastModifiedAtDate: -1 })
      .select("author subject title createdAt lastEditedAt")
      .populate("author", "_id username")
      .exec()
      .then((docs) => {
        return res.status(200).send(docs);
      });
  } catch(err) {
      return res.status(400).send({ message: err.message });
  }
};

// getLatestThreads function.
exports.getLatestThreads = async (req, res) => {
  try {
    // Get 3 latest threads.
    Thread.find()
      .sort({ lastModifiedAtDate: -1 })
      .limit(3)
      .select("author subject title createdAt lastEditedAt")
      .populate("author", "_id username")
      .exec()
      .then((docs) => {
        return res.status(200).send(docs);
      });
  } catch(err) {
    return res.status(400).send({ message: err.message });
  }
};

// getSubject function.
exports.getSubject = async (req, res) => {

  try {

    if (!isNaN(req.params["subject_id"])) { 
      // If no subject filter, get all threads.
      if (req.params["subject_id"] == 0) {
        Thread.find()
        .sort({ lastModifiedAtDate: -1 })
        .select("author subject title createdAt lastEditedAt")
        .populate("author", "_id username")
        .exec()
        .then((docs) => {
          res.status(200).send(docs);
        });
      }
      else {
        // Get threads from certain subject with subject_id.
        Thread.find({ subject: req.params["subject_id"] })
          .sort({ lastModifiedAtDate: -1 })
          .select("author subject title createdAt lastModifiedAt")
          .populate("author", "_id username")
          .exec()
          .then((docs) => {
            return res.status(200).send(docs);
          });
      }
    } else {
      res.status(400).send({ message: "Invalid subject_id."});
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// getOneThread function.
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

  try {
    // Get all data of certain thread with the thread_id.
    Thread.findById(ObjectId(req.params["thread_id"]))
      .select("author title content comments createdAt lastModifiedAt")
      .populate(populateQuery)
      .exec()
      .then((doc) => {
        if (doc)
          res.status(200).send(doc);
        else
          res.status(400).send({ message: "Tutorial not found."});
      });
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
};

// getMyThreads function.
exports.getUserThreads = async (req, res) => {
  try {
  // Find all threads that created by current user.
  Thread.find({ author: req.params["user_id"] })
    .sort({ lastModifiedAtDate: -1 })
    .select("author subject title createdAt lastModifiedAt")
    .populate("author", "_id username")
    .exec()
    .then((docs) => {
      return res.status(200).send(docs);
    });
  } catch(err) {
    return res.status(400).send({ message: err.message });
  }
};

// getFollowingThreads function.
exports.getFollowingThreads = async (req, res) => {

  const { following } = req.body;

  try {
    // get all threads created by the users that is followed by current user.
    Thread.find({ author: { $in: following } })
      .sort({ lastModifiedAtDate: -1 })
      .select("author subject title createdAt lastModifiedAt")
      .populate("author", "_id username")
      .exec()
      .then((docs) => {
        res.status(200).send(docs);
      });
  } catch(err) {
    return res.status(400).send({ message: err.message });
  }
};

// createThread function
exports.createThread = async (req, res) => {

  const { user_id, subject, title, content } = req.body;

  try {
    // Check if current user exists
    const user = await User.findOne({ _id: ObjectId(user_id)});
      // If current user exists
      if (user) {
        
        // Create a thread with request data
        Thread.create(
          {
            author: user._id,
            subject: subject,
            title: title,
            content: content,
            createdAt: new Date().toLocaleDateString("zh-HK"),
            lastEditedAt: new Date().toLocaleDateString("zh-HK"),
            lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
            lastModifiedAtDate: new Date().getTime()
          },
          (err, doc) => {
            if (err) 
              res.status(400).send({ message: err.message });
            else 
              res.status(200).send(doc._id);
          }
        );
      } else res.status(400).send({ message: "User not found."});
  } catch(err) {
    res.status(400).send({ message: err.message });
  }
};

// editThread function.
exports.editThread = async (req, res) => {

  const { thread_id, title, content } = req.body;

  const update = {
    $set: { title: title, 
            content: content, 
            lastEditedAt: new Date().toLocaleDateString("zh-HK"), 
            lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
            lastModifiedAtDate: new Date().getTime(),
          },
  };

  try {
    // Find one thread with the thread_id and update the content of the thread.
    const thread = await Thread.findOne({ _id: ObjectId(thread_id) });
    if (thread) {
      thread.title = title;
      thread.content = content;
      thread.lastEditedAt = new Date().toLocaleDateString("zh-HK");
      thread.lastModifiedAt = new Date().toLocaleDateString("zh-HK");
      thread.lastModifiedAtDate = new Date().getTime();
      thread.save();
    } else {
      res.status(400).send({ message: "Thread not found."});
    }

  } catch(err) {
    res.status(400).send({ message: err.message });
  }
};

// postComment function.
exports.postComment = async (req, res) => {

  const { user_id, content, thread_id } = req.body;

  try {
    const user = await User.findOne({ _id: ObjectId(user_id)});    

    if (user) {
      
        // Create a new comment with the request data.
        var newComment = new ThreadComment(
          {
            author: ObjectId(user_id),
            createdAt: new Date().toLocaleDateString("zh-HK"),
            content: content,
          },
          (err) => {
            if (err) {
              res.status(400).send({ message: err.message });
            }
          });

        newComment.save();

        const update = {
          $push: { comments: newComment._id },
          $set: { 
            lastModifiedAt: new Date().toLocaleDateString("zh-HK"),
            lastModifiedAtDate: new Date().getTime(),
          },
        };
        
        // Find one thread with thread_id and push the objectId to the comments list.
        Thread.findOneAndUpdate({ _id: thread_id }, update, (err, doc) => {
          if (err) res.status(400).send({ message: err.message });
          else if (!doc)
            res.status(400).send({ message: "Thread not found."});
          else
            res.status(200).send(doc);
        });
      }
  } catch(err) {
    res.status(400).send({ message: err.message});
  }
};

// deleteThread function
exports.deleteThread = async (req, res) => {

  const { thread_id } = req.body;
  
  try {
    // Find one thread with thread_id and remove it from collection.
    const thread = await Thread.findOne({ _id: ObjectId(thread_id)});
    
    if (thread) {
      thread.remove();
      res.status(200).send({ message: "Thread has been deleted successfully." });
    }
    else {
      res.status(400).send({ message: "Thread not found."});
    }
  } catch(err) {
    res.status(400).send({ message: err.message });
  }
};
