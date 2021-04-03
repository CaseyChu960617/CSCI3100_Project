const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date() , required: true }
}, { collection: 'messages'});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;