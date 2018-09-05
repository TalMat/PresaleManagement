let crypto = require('crypto');

class Crypt {
    constructor(key){
        this.key = key;
    }

    encrypt(data){
        try {
            let cipher = crypto.createCipher('aes-256-cbc', this.key);
            return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        } catch(exception){
            console.log(exception);
        }
    }

    decrypt(data){
        try {
            let decipher = crypto.createDecipher('aes-256-cbc', this.key);
            return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
        } catch(exception){
            console.log(exception);
        }
    }
}

exports.Crypt = Crypt;