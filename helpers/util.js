

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = {
    replaceAll: function(str, map) {
        for(key in map){
            str = str.replaceAll(key, map[key]);
        }
        return str;
    }
}