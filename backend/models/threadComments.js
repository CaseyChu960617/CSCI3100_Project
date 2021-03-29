const mongoose = require('mongoose');

const threadCommentSchema = new mongoose.Schema({
    //thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' ,required: true, },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    createdAt:  { type: Date, required: true },
    content: { type: String, required: true }

}, { collection: 'threadComments'});

const threadCommentModel = mongoose.model('ThreadComment', threadCommentSchema);
module.exports = threadCommentModel;