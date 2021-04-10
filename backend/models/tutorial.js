const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    subject: { type: String, required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' ,required: true, }],
    comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'TutorialComment' ,required: true, }],
    createdAt:  { type: Date, required: true },
    lastEditedAt:  { type: Date, required: true },
    lastModifiedAt:  { type: Date, required: true },
    published: { type: Boolean, required: true, default: false }
}, { collection: 'tutorials'});

const tutorialModel = mongoose.model('Tutorial', tutorialSchema);
module.exports = tutorialModel;

