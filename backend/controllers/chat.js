const Chat = require("../models/chat");
const Message = require("../models/message");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllChats function.
exports.getAllChats = async (req, res) => {
  
  // Find all existing chats with this user_id as one of participants
  Chat.find({ $or: [{ userA: req.params["user_id"] }, { userB: req.params["user_id"] }] })
  .sort({ createdAt: -1 })
  .select("_id userA userB")
  .populate("userA userB", "_id username profileImage")
  .exec()
  .then((docs) => {
      res.status(200).send(docs);
  });
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
          (err, doc) => {
            if (err) res.status(400).send({ message: err.message });
            else res.status(200).send(doc);
          }
        );
      } else res.status(200).send(doc);
    });
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
        (err, doc) => {
          if (err) res.status(400).send({ message: err.message });
          else res.status(200).send(doc);
        });
    } else res.status(200).send(doc);
  });
};
