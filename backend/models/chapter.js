const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt:  { type: Date, required: true },
    lastEditedAt:  { type: Date, required: true },
}, { collection: 'chapters'});

const chapterModel = mongoose.model('Chapter', chapterSchema);
module.exports = chapterModel;