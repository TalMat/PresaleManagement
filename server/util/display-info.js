let fs = require('fs');

module.exports = () => {

    let appInfo = JSON.parse(fs.readFileSync('./application.json'));
    logTime(`Node: ${process.version}`, `Application: ${appInfo.version}`);
};
