const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    category: { type: Number, required: true },
    createdAt:  { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ThreadComment'}],
}, { collection: 'threads'});

const threadModel = mongoose.model('Thread', threadSchema);
module.exports = threadModel;