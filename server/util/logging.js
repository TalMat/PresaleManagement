let moment = require('moment');
let dateFormat = 'MM.DD.YY h:mmA';

exports.logTime = function(){
    let logMessage = [].slice.call(arguments).reduce((acc, cur) => { return acc + cur + ' | ' }, '');
    logMessage += moment().format(dateFormat);
    console.log(logMessage);
};