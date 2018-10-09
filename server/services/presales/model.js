let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let codeSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    batch: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});


let Code = mongoose.model('Code', codeSchema);
codeSchema.plugin(uniqueValidator);

module.exports = Code;