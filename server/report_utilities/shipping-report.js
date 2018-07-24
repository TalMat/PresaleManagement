let fs = require('fs');
let createCsv = require('csv-writer').createObjectCsvWriter;

function generateReport(filename, o){
    // let filename = 'ship_' + date_() + '.csv';
    let csv = createCsv({
        path: './reports/' + filename,
        header: [
            { id: 'namedrop',   title: 'NAMEDROP' },
            { id: 'name',       title: 'NAME' },
            { id: 'address1',   title: 'ADDRESS' },
            { id: 'address2',   title: '' }
        ]
    });

    let orders = o.map(order => {
        return {
            namedrop:   order.namedrop,
            name:       order.name,
            address1:   order.address[0],
            address2:   order.address[1]
        }
    });

    return csv.writeRecords(orders)
        .then(() => {
            console.log(filename + ' is complete.');
            return Promise.resolve(filename);
        })
        .catch(err => {
            console.log(filename + ' file error: ' + err);
        });
}

module.exports = {
    generate: generateReport
};