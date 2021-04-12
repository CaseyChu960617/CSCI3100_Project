//Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/connectDB");
const Message = require("./models/message");
const Chat = require("./models/chat");
var ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

//Import routes
const authRoutes = require("./routes/auth");
const threadRoutes = require("./routes/thread");
const tutorialRoutes = require("./routes/tutorial");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const uploadRoutes = require('./routes/upload');

//App config
global.baseURL = __dirname;
var corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
};

const app = express();
const port = process.env.PORT;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const http = require("http").createServer(app);

var socketID = "";
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.DOMAIN_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  socketID = socket.id;

  socket.on("joinRoom", (data) => {
    socket.leave(data.oldChatId);
    socket.join(data.chatId);
    console.log(
      "user " +
        data.sender +
        " join room " +
        data.chatId +
        " leave room " +
        data.oldChatId
    );
    if (data.oldChatId != null && !(data.oldChatId === data.chatId)) {
      //console.log("clear");
      //io.to(data.chatId).emit("clearMessage", {
      // messages: [],
      // });
    }
  });

  console.log("a user connected", socket.id);

  socket.emit("clientGetId", {
    socketID: socketID,
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("send", (data) => {
    //console.log(data.sender + " send in room " + data.chatId);
    console.log(data);
    io.to(data.chatId).emit("updateMessage", data);
    //const { sender_id, message } = req.body;

    const newMessage = new Message(
      {
        sender: new ObjectId(data.sender._id),
        message: data.message,
        timestamp: data.timestamp,
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
        res
          .status(400)
          .json({ error: "message cannot be posted successfully." });
    });

    Chat.findOneAndUpdate(
      { _id: data.chatId },
      { $push: { messages: newMessage._id } },
      (err) => {
        if (err) res.status(400).json({ error: "Bad request." });
      }
    );
  });
  socket.on("leave", (data) => {
    socket.disconnect();
    console.log("disconnected");
  });
});

http.listen(port, () => {
  console.log("Listenting at localhost:" + port);

  //API routes
  app.use("/auth", authRoutes);

  app.use("/thread", threadRoutes);

  app.use("/tutorial", tutorialRoutes);

  app.use("/user", userRoutes);

  app.use("/chat", chatRoutes);

  app.use("/upload", uploadRoutes);
});
