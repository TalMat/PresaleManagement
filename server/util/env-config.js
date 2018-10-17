let fs = require("fs");
let path = require('path');

function setEnvVarsFromFile(filepath){
    let config = JSON.parse(fs.readFileSync(filepath));
    Object.keys(config).forEach(key => {
        process.env[key] = config[key];
    });
}

exports.init = (configFilepath) => {
    let configPath = path.join('./' + configFilepath);
    fs.existsSync(configPath)
        ? setEnvVarsFromFile(configPath)
        : console.log(`No config file. Configuring ${__filename} with env vars.`);
};