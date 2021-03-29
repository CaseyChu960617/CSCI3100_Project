const Thread = require('../models/thread');
const ThreadComment = require('../models/threadComments');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
var ObjectId = require('mongoose').Types.ObjectId;
const { Mongoose } = require('mongoose');


// getAllThread function
exports.getAllThreads = async (req, res) => {
    //const accessToken = req.fields.accessToken;
    //const decodedToken = jwt.verify(accessToken, process.env.JWT_ACC_SECRET);
    //console.log(decodedToken);

    Thread.find()
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then(docs => {
        
        res.status(200).json({
            dicussionThreads: docs
        })
    });
}

// createThread function
exports.getCategory = async (req, res) => {
    Thread.find({category: req.params['category_id']})
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec()
    .then(docs => {
        res.status(200).json({
            discussionThreads: docs  
        })
    })
}

// getOneThread function
exports.getOneThread = async (req, res) => {
    const { uid } = req.body;
    const thread_id  = req.params['thread_id'];
    console.log(thread_id);
    Thread.findById(thread_id)
    .select('author title content createdAt')
    .populate('author', '_id username')
    .exec()
    .then((doc) => {
        res.status(200).json({
            discussionThread: doc
        })
    }); /*(err,data) => {
    if (err) {
            res.status(400).json({ error: "Discussion thread not found."});
        }
        console.log(data);
        data.populated('author');
        console.log(data.author.username);
    });*/
}

// createThread function
exports.editThread = async (req, res) => {

}

// createThread function
exports.postComment = async (req, res) => {
    const thread_id = req.params['thread_id'];
    const { uid , content } = req.body;
            
    var newcomment = new ThreadComment({
        author: new ObjectId(uid),
        createdAt: new Date().getTime(),
        content: content
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: "Bad request."});
        }
        //else
        //    console.log(data);
    });
    newcomment.save(err => {
        if (err)
            res.status(400).json({ error: "Comment cannot be posted successfully."});
    })
    console.log(newcomment);
    console.log(thread_id);
    Thread.findOneAndUpdate({ _id: thread_id },
        { "$push": { "comments": newcomment._id } }, (err, doc) => {
        if (err)
            res.status(400).json({ error: "Bad request."});
        else
        res.status(200).json({
            discussionThread: doc,
            message: "successfully comment."
            });
    })
}



// createThread function
exports.deleteThread = async (req, res) => {
    Thread.findById(req.params['thread_id'], (err, doc) => {
        doc.remove();
        res.status(200).json({
            discussionThread: doc,
            message: "Thread successfully deleted."
        })
    });
}

// createThread function
exports.createThread = async (req, res) => {

    const { uid, category, title, content } = req.body;

    User.findById(uid, { lean: true }, (err, user) => {
        if (err) 
            res.status(400).json({ error: "User not found!" });
        if (user) {
            console.log(user);
            Thread.create({
                author: user._id,
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
            })
        }
        else
            res.status(400).json({ error: "User not found."});
    });
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
}