let mongoose =          require('mongoose');
let uniqueValidator =   require('mongoose-unique-validator');
let validator =         require('mongoose-validator');
let config =            require('../../config');
let { Crypt } =         require('../services/EncryptionService');

let crypt = new Crypt(config.CRYPT_SECRET || process.env.CRYPT_SECRET);

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

orderSchema.plugin(uniqueValidator);

orderSchema.methods.decrypt = function(){
    let decrypted = Object.assign(this);
    decrypted.address[0] = crypt.decrypt(this.address[0]);
    decrypted.address[1] = crypt.decrypt(this.address[1]);
    if(decrypted.phone){ decrypted.phone = crypt.decrypt(this.phone); }
    return decrypted;
};

orderSchema.pre('save', function(next){
    this.address = [
        crypt.encrypt(this.address[0]),
        crypt.encrypt(this.address[1])
    ];
    if(this.phone){ this.phone = crypt.encrypt(this.phone); }
    next();
});

let Order = mongoose.model('Order', orderSchema);
module.exports = Order;