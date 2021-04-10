const mongoose = require('mongoose');


const tutorCommentSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    content: { type: String, required: true },
    createdAt:  { type: Date, required: true }
}, { collection: 'tutorialComments'});

const tutorCommentModel = mongoose.model('TutorialComment', tutorCommentSchema);

module.exports = tutorCommentModel;