const mongoose = require('mongoose');
const user = require('../models/user')

const tutoreplyschema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user' ,required: true, },
    Date:  { type: Date, required: true },
    content: { type: String, required: true }
    
}, { collection: 'tutorReply'});

const tutoreplyModel = mongoose.model('tutoreplyschema', tutoreplyschema);

module.exports = tutoreplyModel;