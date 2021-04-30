const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllChats function.
exports.getAllChats = async (req, res) => {
  try {

    const user = await User.findOne({ _id: ObjectId(req.params["user_id"])});

    if (user) {
      // Find all existing chats with this user_id as one of participants
      Chat.find({ $or: [{ userA: req.params["user_id"] }, { userB: req.params["user_id"] }] })
      .sort({ createdAt: -1 })
      .select("_id userA userB")
      .populate("userA userB", "_id username profileImage")
      .exec()
      .then((docs) => {
          res.status(200).send(docs);
      });
    } else　{
      res.status(400).send({ message: "User not found."});
    }
  } catch(err) {
    return res.status(400).send({ message: err.message });
  }
};

// getOneChatById function
exports.getOneChatById = async (req, res) => {

  var populateQuery = [
    { path: "userA", select: "_id username profileImage" },
    { path: "userB", select: "_id username profileImage" },
    {
      path: "messages",
      select: "message timestamp",
      populate: {
        path: "sender",
        select: "_id username",
      },
    },
  ];

  try {

    

    // Find the chat and all the messages in the chat with this chat_id.
    await Chat.findOne({ _id: req.params["chat_id"] })
      .select("userA userB messages")
      .populate(populateQuery)
      .exec()
      .then((doc) => {
        // If chat does no exist, create a chat.
        if (!doc) {
          Chat.create(
            {
              userA: user_id_1,
              userB: user_id_2,
              messages: [],
            },
            (doc) => {
              res.status(200).send(doc);
            }
          );
        } else res.status(200).send(doc);
      });
  } catch(err) {
    return res.status(400).send({ message: err.message });
  }
};

// getOneChat function
exports.getOneChat = async (req, res) => {

  const { user_id_1, user_id_2 } = req.body;

  var populateQuery = [
    { path: "userA", select: "_id username" },
    { path: "userB", select: "_id username" },
    {
      path: "messages",
      select: "message timestamp",
      populate: {
        path: "sender",
        select: "_id username",
      },
    },
  ];

  try {

    const userA = User.findOne({ _id: ObjectId(user_id_1)});
    const userB = User.findOne({ _id: ObjectId(user_id_2)});

    if (userA && userB) {
    // Find one chat with two user_id.
    await Chat.findOne({
      $or: [
        { userA: user_id_1, userB: user_id_2 },
        { userA: user_id_2, userB: user_id_1 },
      ],
    })
    .select("userA userB messages")
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      // If the chat does not exist, create a chat.
        if (!doc) {
          Chat.create(
            {
              userA: user_id_1,
              userB: user_id_2,
              messages: [],
              createdAtDate: new Date().getTime(),
            },
            (doc) => {
              res.status(200).send(doc);
            });
        } else res.status(200).send(doc);
      });
    } else {
      res.status(400).send({ message: "User not found." });
    }
  } catch(err) {
    res.status(400).send({ message: err.message });
  }
};

// Send message function.
exports.sendMessage = async (data) => {
  try {
    // Create a new message and push the objectId 
    // to the messages list in corresponding chat
    const newMessage = new Message(
      {
        sender: new ObjectId(data.sender._id),
        message: data.message,
        timestamp: data.timestamp,
      });

    newMessage.save();

    Chat.findOneAndUpdate(
      { _id: data.chatId },
      { $push: { messages: newMessage._id } });
      
  } catch(err) {

  }
}