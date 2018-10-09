let Inventory = require('./model');

exports.getAll = (req, res) => {
    Inventory.find()
        .then( items => {
            return Promise.all([
                Promise.resolve({
                    success: true,
                    items: items.filter(i => i.kind !== 'current')
                }),
                updateCurrent()
            ]);
        })
        .then(data => {
            // console.log(data[0]);
            // console.log(data[1]);
            return Object.assign(data[0], { current: data[1] });
        })
        .then(data => {
            // console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log(`Error retrieving inventory:`);
            console.log(err);
            res.json({ success: false, message: err })
        })
};

exports.newItem = (req, res) => {
    console.log('Making new inventory item...');
    // console.log(req.body);

    let item = new Inventory({
        kind: req.body.kind,
        description: req.body.description,
        counts: req.body.counts
    });

    item.save()
        .then(result => {
            return updateCurrent();
        })
        .then(current => {
            res.json({
                success: true,
                message: 'Inventory item added',
                item,
                current: current
            });
        })
        .catch(err => {
            console.log(`Error saving inventory item:`);
            console.log(err);
        });
};

exports.deleteItem = (req, res) => {
    console.log('Delete inventory item with id ' + req.body.id);

    let id = req.body.id;

    Inventory.findOneAndDelete({ _id: id })
        .then(() => {
            return updateCurrent();
        })
        .then(current => {
            res.json({
                success: true,
                message: 'Inventory item deleted',
                id,
                current: current
            });
        })
        .catch(err => {
            console.log(`Error deleting inventory item:`);
            console.log(err);
        });
};

function updateCurrent(){
    let currentInv = {
        kind: 'current',
        description: 'current computed inventory',
        counts: {
            'y-xs': 0,      'y-s': 0,       'y-m': 0,       'y-l': 0,
            'y-xl': 0,      'a-s': 0,       'a-m': 0,       'a-l': 0,
            'a-xl': 0,      'a-2xl': 0,     'a-3xl': 0,     'a-4xl': 0,
            'a-5xl': 0
        } };

    return Inventory.findOne({ kind: 'update' }, {}, {sort: {date: -1}})
    // Find only the most recent 'update'
        .then(newestUpdate => {
            if(newestUpdate){
                currentInv.counts = newestUpdate.counts;

                // Find all orders newer than most recent update
                return Inventory.find({ date: { $gt: newestUpdate.date }});
            }
        })
        .then(sinceUpdate => {
            if(sinceUpdate){
                sinceUpdate = sinceUpdate
                    .map(item => item._doc)
                    .filter(item => item.kind !== 'current');

                return transformInventory(currentInv, sinceUpdate);
            } else {
                return currentInv;
            }
        })
        .then(currentInventory => {
            return Inventory.findOneAndUpdate(
                { kind: 'current'},
                {
                    counts: currentInventory.counts,
                    date: new Date('January 1, 2048'),
                    description: 'calculated inventory'
                },
                { upsert: true, new: true });
        })
        .then(() => {
            // console.dir(currentInv);
            return currentInv;
        })
    // .catch(err => {
    //     console.log('Error... ' + err);
    // });
}

function transformInventory(startItem, accuItems){
    return accuItems.reduce((currentCounts, invItem) => {
        switch(invItem.kind){
            case 'misprint':
            case 'production':
                return subtractCounts(currentCounts, invItem);
                break;
            case 'product-order':
            case 'adjustment':  // May contain negative values
                return addCounts(currentCounts, invItem);
                break;
        }
    }, startItem) // Start with current inventory
}

function subtractCounts(a, b){
    for(let c in b.counts){ a.counts[c] -= b.counts[c] }
    return a;
}

function addCounts(a, b){
    for(let c in b.counts){ a.counts[c] += b.counts[c] }
    return a;
}