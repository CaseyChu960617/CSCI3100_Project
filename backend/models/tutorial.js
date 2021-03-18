const mongoose = require('mongoose');
const user = require('../models/user')
const chapter = require('../models/chapter')
const tutorReply = require('../models/tutorReply')

const tutorialSchema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user' ,required: true, },
    chapter: [{ type: Schema.Types.ObjectId, ref: 'chapter' ,required: true, }],
    tutorReply:  [{ type: Schema.Types.ObjectId, ref: 'tutorReply' ,required: true, }],
    createDate:  { type: Date, required: true },
    subject: { type: String, required: true },
    
}, { collection: 'tutorial'});

const tutorialModel = mongoose.model('tutorial', tutorialSchema);
module.exports = tutorialModel;

