const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    sender:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true, },
    content: { type: String, required: true },
    createdAt:  { type: Date, required: true }
}, { collection: 'chapters'});

const chapterModel = mongoose.model('Chapter', chapterSchema);
module.exports = chapterModel;