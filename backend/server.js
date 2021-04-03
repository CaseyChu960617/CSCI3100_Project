//Import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/connectDB');


//Import routes
const authRoutes = require('./routes/auth');
const threadRoutes = require('./routes/thread');
const tutorialRoutes = require('./routes/tutorial');

//App config
var corsOptions = {
    origin: `${process.env.CLIENT_URL}`
};

const app = express();
const port = process.env.PORT;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const http = require("http").createServer(app);
const socketIO = require("socket.io")(http);
var socketID = "";

socketIO.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socketID = socket.id;
});

http.listen(port, () => {
    console.log("Listenting at localhost:" + port);

    //API routes
    app.use("/auth", authRoutes);

    app.use("/thread", threadRoutes);

    app.use("/tutorial", tutorialRoutes);
});




