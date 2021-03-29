const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User' ,required: true, },
    subject: { type: String, required: true },
    chapter: [{ type: Schema.Types.ObjectId, ref: 'Chapter' ,required: true, }],
    tutorialComments:  [{ type: Schema.Types.ObjectId, ref: 'TutorialComment' ,required: true, }],
    createdAt:  { type: Date, required: true },
}, { collection: 'tutorials'});

const tutorialModel = mongoose.model('Tutorial', tutorialSchema);
module.exports = tutorialModel;

