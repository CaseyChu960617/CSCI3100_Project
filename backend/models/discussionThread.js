const mongoose = require('mongoose');
const user = require('user')

const discussionThreadSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' ,required: true, },
    category: { type: int, required: true },
    date:  { type: Date, required: true },
    content: { type: String, required: true }

}, { collection: 'discussionThread'});

const discussionThreadModel = mongoose.model('discussionThread', discussionThreadSchema);

module.exports = discussionThreadModel;