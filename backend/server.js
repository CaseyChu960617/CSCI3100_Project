//Import
//const Users = require('./userSchema')
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//App config
const app = express();
const port = process.env.PORT || 9000;
const http = require("http").createServer(app);
const socketIO = require("socket.io")(http);
var socketID = "";
const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbasd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


//Middleware
app.use(bodyParser.urlencoded());
app.use(cors());

socketIO.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socketID = socket.id;
});

http.listen(port, () => {
    console.log("Listenting at localhost:" + port);

    mongoose.connect(connectionURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },() => console.log("DB connected"));

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));// Upon opening the database successfully

    db.once('open', function () {
        console.log("Connection is open...");
    });

    //API routes
    app.post("/signup", async (req, res) => {
        console.log(req.body);
        var lastname = req.body.lastname;
        console.log(lastname);
        var firstname = req.body.firstname;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var gender = req.body.gender;
        var reset_token = "";

        db.collection("users").findOne({
            $or: [{
                "email": email
            }, {
                "username": username
            }]
        }), (err,user) => {
            if (user == null) {
                bcrypt.hash(password, 10, (err, hash) => {
                    db.collection("users").insertOne({
                        "lastname": lastname,
                        "firstname": firstname,
                        "username": username,
                        "email": email,
                        "password": hash,
                        "gender": gender,
                        "reset_token": reset_token,
                        "profileImage": "",
                        "following": [],
                        "notifications": [],
                        "groups": [],
                        "posts": []
                    });
                });
            } else {
                res.json({
                    "status": "error",
                    "message": "Email or username already exist."
                })
            }
        }
    });
});




