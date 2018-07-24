let createCsv = require('csv-writer').createObjectCsvWriter;

function generateReport(filename, c){
    let csv = createCsv({
        path: './reports/' + filename,
        header: [
            { id: 'code',       title: 'CODE' },
            { id: 'available',  title: 'AVAILABILITY' }
        ]
    });

    let codes = c.map(code => {
        return {
            code:       code.code,
            available:  code.available ? 'Available' : 'Redeemed'
        }
    });

    return csv.writeRecords(codes)
        .then(() => {
            console.log(filename + ' is complete.');
            return filename;
        })
        .catch(err => {
            console.log(filename + ' file error: ' + err);
        });
}

module.exports = {
    generate: generateReport
};