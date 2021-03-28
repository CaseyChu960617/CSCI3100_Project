//Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./db/connectDB");
require("./socket.io/connectSocket");
const User = require("./models/user");

//Import routes
const authRoutes = require("./routes/auth");
//const threadRoutes = require('./routes/thread');

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
  console.log("a user connected", socket.id);
  socketID = socket.id;

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  //send meessage and emit to recieve function
  socket.on("send", (data) => {
    console.log(data);
    io.emit("recieve", data);
  });
});

http.listen(port, () => {
  console.log("Listenting at localhost:" + port);

  //API routes
  app.use("/auth", authRoutes);

  //app.use("/thread", threadRoutes);
});
