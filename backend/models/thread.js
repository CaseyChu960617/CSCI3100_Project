const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    subject: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ThreadComment'}],
    createdAt:  { type: String, required: true },
    lastEditedAt:  { type: String, required: true },
    lastModifiedAt: { type: String, require: true },
    lastModifiedAtDate: { type: Date, required: true },
}, { collection: 'threads'});

const threadModel = mongoose.model('Thread', threadSchema);
module.exports = threadModel;