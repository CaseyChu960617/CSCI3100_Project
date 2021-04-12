const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt:  { type: String, required: true },
    lastEditedAt:  { type: String, required: true },
}, { collection: 'chapters'});

const chapterModel = mongoose.model('Chapter', chapterSchema);
module.exports = chapterModel;