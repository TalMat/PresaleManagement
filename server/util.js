exports.date = function(){
    return new Date().toISOString().split('T')[0];
};

exports.phone = function(p){
    return '(' +
        p.substring(0, 3) + ') ' +
        p.substring(3, 6) + ' ' +
        p.substring(6);
};