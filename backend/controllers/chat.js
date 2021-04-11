const Chat = require("../models/chat");
const Message = require("../models/message");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

// getAllChatsfunction
exports.getAllChats = async (req, res) => {
  const uid = req.params["uid"];
  console.log(uid);

  await Chat.find({ $or: [{ userA: uid }, { userB: uid }] })
    .sort({ createdAt: -1 })
    .select("_id userA userB")
    .populate("userA userB", "_id username profileImage")
    .exec()
    .then((docs) => {
      //console.log(docs);
      res.send(docs);
    });
};

// getOneChatByIdfunction
exports.getOneChatById = async (req, res) => {
  const chat_id = req.params["chat_id"];

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

  await Chat.findOne({ _id: chat_id })
    .select("userA userB messages")
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        Chat.create(
          {
            userA: uid_1,
            userB: uid_2,
            messages: [],
          },
          (err, doc) => {
            if (err) res.status(400).json({ error: "Bad request." });
            else res.send(doc);
          }
        );
      } else res.send(doc);
    });
};

// getOneChatfunction
exports.getOneChat = async (req, res) => {
  const { uid_1, uid_2 } = req.body;

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

  await Chat.findOne({
    $or: [
      { userA: uid_1, userB: uid_2 },
      { userA: uid_2, userB: uid_1 },
    ],
  })
    .select("userA userB messages")
    .populate(populateQuery)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        Chat.create(
          {
            userA: uid_1,
            userB: uid_2,
            messages: [],
          },
          (err, doc) => {
            if (err) res.status(400).json({ error: "Bad request." });
            else res.send(doc);
          }
        );
      } else res.send(doc);
    });
};

/*exports.sendMessage = async (req, res) => {
  const chat_id = req.params["chat_id"];
  const { sender_id, message } = req.body;

  const newMessage = new Message(
    {
      sender: new ObjectId(sender_id),
      message: message,
      timestamp: new Date().getTime(),
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Bad request." });
      }
    }
  );

  newMessage.save((err) => {
    if (err)
      res.status(400).json({ error: "message cannot be posted successfully." });
  });

  Chat.findOneAndUpdate(
    { _id: chat_id },
    { $push: { messages: newMessage._id } },
    (err, doc) => {
      if (err) res.status(400).json({ error: "Bad request." });
      else res.send(doc);
    }
  );
};*/
