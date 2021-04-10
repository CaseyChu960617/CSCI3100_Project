const Thread = require("../models/thread");
const ThreadComment = require("../models/threadComment");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllThread function
exports.getAllThreads = async (req, res) => {
    Thread.find()
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
    
    Thread.find({category: req.params['category_id']})
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getOneThread function
exports.getOneThread = async (req, res) => {

  const thread_id = req.params["thread_id"];
  var populateQuery = [
      { path:'author', select:'_id username'}, 
      { path:'comments', select:'content', populate: {
        path: 'author',
        select: '_id username'
      }}];
    
  console.log(thread_id);
  Thread.findById(thread_id)
    .select("author title content comments createdAt")
    .populate(populateQuery)
    .exec()
    .then((docs) => {
      res.send(docs);
    }); 
};

// getMyThreads function
exports.getMyThreads = async (req, res) => {

  const my_id = req.params["my_id"];

  Thread.find({ author: my_id })
  .sort({ createdAt: -1})
  .select('author category title createdAt')
  .populate('author', '_id username')
  .exec()
  .then((docs) => {
    res.send(docs);
  });
};

// getFollowingThreads function
exports.getFollowingThreads = async (req, res) => {

  const { following } = req.body;

     Thread.find({ author: { $in: following } })
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then((err, docs) => {

      if (err) 
        res.status(400).json({ error: err.message });
      else
        res.send(docs);
    });

  }

// createThread function
exports.createThread = async (req, res) => {
  const { uid, category, title, content } = req.body;

  User.findById(uid, { lean: true }, (err, user) => {
    if (err) res.status(400).json({ error: "User not found!" });
    if (user) {
      console.log(user);
      Thread.create(
        {
          author: user._id,
          category: category,
          createdAt: new Date().getTime(),
          title: title,
          content: content,
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
  const { thread_id, title, content } = req.body

  Thread.findOneAndUpdate({ _id: thread_id }, { $set: { title: title, content: content } }, (err, doc) => {
    if (err) res.status(400).json({ error: "Bad request." });
    else
      res.send(doc);
  });
};

// postComment function
exports.postComment = async (req, res) => {
  
  const { uid, content, theread_id } = req.body;

  var newComment = new ThreadComment(
    {
      author: new ObjectId(uid),
      createdAt: new Date().getTime(),
      content: content,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
      }
      //else
      //    console.log(data);
    }
  );
  newComment.save((err) => {
    if (err) res.status(400).json({ error: "Comment cannot be posted successfully." });
  });
  console.log(newComment);
  console.log(thread_id);
  Thread.findOneAndUpdate({ _id: thread_id }, 
    { $push: { comments: newComment._id } }, 
    (err, doc) => {
      if (err) 
        res.status(400).json({ error: err.message });
      else
        res.send(doc);  
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


