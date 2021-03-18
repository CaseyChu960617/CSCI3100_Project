const mongoose = require('mongoose');
const user = require('../models/user')

const discussionThreadSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user' ,required: true, },
    Date:  { type: Date, required: true },
    content: { type: String, required: true }

}, { collection: 'discussionThread'});

const discussionThreadModel = mongoose.model('discussionThread', discussionThreadSchema);

module.exports = discussionThreadModel;