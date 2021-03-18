const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title:  { type: String, required: true },

}, { collection: 'chapter'});

const chapterModel = mongoose.model('chapter', chapterSchema);
module.exports = chapterModel;