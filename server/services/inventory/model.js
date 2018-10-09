let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

const MAX_DESC_LEN = 100;
const INV_ITEM_BOUNDS = 999;
const INVENTORY_TYPES = [
    'product-order', 'misprint', 'production', 'adjustment', 'update', 'current'
];
const VALID_PROPS = [];


let inventorySchema = new mongoose.Schema({
    kind: {
        type: String,
        validate: {
            validator(k){
                return INVENTORY_TYPES.includes(k);
            }
        }
    },
    description: {
        type: String,
        validate: {
            validator(d){
                return d.length < MAX_DESC_LEN;
            }
        }
    },
    counts: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// todo - validate counts object


let Inventory = mongoose.model('Inventory', inventorySchema);
inventorySchema.plugin(uniqueValidator);

module.exports = Inventory;