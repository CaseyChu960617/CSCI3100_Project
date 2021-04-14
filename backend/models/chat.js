const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userA:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    userB:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    createdAtDate: { type: Date, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
}, { collection: 'chats'});

const chatModel = mongoose.model('Chat', chatSchema);
module.exports = chatModel;