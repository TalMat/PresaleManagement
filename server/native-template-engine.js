let fs = require('fs');
let excludeKeys = ['settings', 'messages', '_locals', 'cache'];

module.exports = (filepath, options, callback) => {
    fs.readFile(filepath, 'utf8', (err, html) => {
        if(err) return callback(err);

        Object.keys(options).filter(key => {
            return !excludeKeys.some(k => k === key)
        }).forEach(key => {
            html = html.replace('${' + key + '}', options[key]);
        });

        callback(null, html);
    })
};