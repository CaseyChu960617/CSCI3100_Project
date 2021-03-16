const mongoose = require('mongoose');

const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbasd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(connectionURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},() => console.log("DB connected"));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));// Upon opening the database successfully

db.once('open', () => {
    console.log("Connection is open...");
});