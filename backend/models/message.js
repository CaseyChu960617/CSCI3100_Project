const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true },
    message: { type: String, required: true},
    timestamp: { type: String, required: true}
}, { collection: 'messages'});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;