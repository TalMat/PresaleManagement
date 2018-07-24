let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let validator = require('mongoose-validator');

const MAX_NAMEDROP_LEN = 22;
const STATUS_LIST = [
    'new', 'printing', 'shipped', 'invoiced', 'cancelled'
];
const SIZE_LIST = [
    'y-xs',     'y-s',      'y-m',      'y-l',
    'y-xl',     'a-s',      'a-m',      'a-l',
    'a-xl',     'a-2xl',     'a-3xl',     'a-4xl',
    'a-5xl'
];

let orderSchema = new mongoose.Schema({
    history: {
        printing: Date,
        shipped: Date,
        invoiced: Date
    },
    status: {
        type: String,
        default: 'new',
        validate: {
            validator: function(st){
                return STATUS_LIST.includes(st);
            }
        },
        message: function(){
            return 'current status must be one of:' + STATUS_LIST.map(status => {
                return '\n' + status;
            });
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    namedrop: {
        type: String,
        validate: {
            validator: function(n){
                return n.length < MAX_NAMEDROP_LEN;
            }
        },
        message: 'Maximum namedrop length is ' + MAX_NAMEDROP_LEN + ' characters'
    },
    size: {
        type: String,
        validate: {
            validator: function(s){
                return SIZE_LIST.includes(s);
            }
        },
        message: function(){
            return 'Size must be one of: ' + SIZE_LIST.map(size => {
                return '\n' + size;
            });
        }
    },
    name: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    address: {
        type: Array
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
});

let Order = mongoose.model('Order', orderSchema);
orderSchema.plugin(uniqueValidator);

module.exports = Order;