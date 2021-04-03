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

io.on("connection", async (socket) => {
  socketID = socket.id;

  await socket.join("cdsa");
  console.log("At room", socket.rooms);

  console.log("a user connected", socket.id);

  socket.emit("clientGetId", {
    socketID: socketID,
  });

  socket.on("joinRoom", (data) => {
    console.log("user " + data.id + "join room");
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



http.listen(port, () => {
  console.log("Listenting at localhost:" + port);

  //API routes
  app.use("/auth", authRoutes);

  app.use("/thread", threadRoutes);

  app.use("/tutorial", tutorialRoutes);

  app.use("/user", userRoutes);
  //app.use("/thread", threadRoutes);
});
