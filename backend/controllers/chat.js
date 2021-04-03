const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllThread function
exports.getChats = async (req, res) => {
    Chat.find()
    .sort({ createdAt: -1})
    .select('userA userB messages')
    .populate('userA userB messages')
    .exec()
    .then((docs) => {
      res.send(docs);
    });
};

// getCategory function
exports.getCategory = async (req, res) => {

    const { uid_1, uid_2 } = req.body;
    
    const chat = await Chat.findOne({$or: [ { 'userA': uid_1, 'userB': uid_2 }, { 'userA': uid_2, 'userB': uid_1 } ]} )
    .sort({ createdAt: -1})
    .select('author category title createdAt')
    .populate('author', '_id username')
    .exec();

    if (!chat) {
        
    }


};