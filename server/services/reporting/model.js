let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

const REPORT_TYPES = [
    'invoice', 'production', 'shipping', 'general', 'presale'
];


let reportSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    filename: {
        type: String
    },
    kind: {
        type: String,
        validate: {
            validator(k){
                return REPORT_TYPES.includes(k);
            }
        }
    },
    description: {
        type: String
    },
    order_codes: {
        type: Array
    }
});

let Report = mongoose.model('Report', reportSchema);
reportSchema.plugin(uniqueValidator);

module.exports = Report;