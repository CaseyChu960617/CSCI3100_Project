//Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/connectDB");

//Import routes
const authRoutes = require("./routes/auth");
const threadRoutes = require("./routes/thread");
const tutorialRoutes = require("./routes/tutorial");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

//App config
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
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("At room before joining", socket.rooms);
  socketID = socket.id;

  socket.on("joinRoom", (data) => {
    //socket.join(data.roomId);
    //console.log("user " + data.user + " join roomID " + data.roomId);

    if (data.user.localeCompare("555")) {
      socket.join("1234");
      console.log("user " + data.user + " join roomID 1234");
      var roster = io.sockets.clients("1234");
    }

    if (!data.user.localeCompare("555")) {
      socket.join("123");
      console.log("user " + data.user + " join roomID 123");
    }
  });

  console.log("At room", socket.rooms);

  console.log("a user connected", socket.id);

  socket.emit("clientGetId", {
    socketID: socketID,
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  //send meessage and emit to recieve function
  socket.on("send", (data) => {
    console.log(data);
    io.emit("updateMessage", data);
  });
});

console.log("Listenting at localhost:" + port);

//API routes
app.use("/auth", authRoutes);

app.use("/thread", threadRoutes);

app.use("/tutorial", tutorialRoutes);

app.use("/user", userRoutes);

app.use("/chat", chatRoutes);
