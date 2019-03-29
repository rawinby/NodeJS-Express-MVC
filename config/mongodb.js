const mongoose = require('mongoose');
const config = {
    db : 'mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASS+'@'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT+'/'+process.env.MONGODB_DBNAME
 };
 
 const dbc = mongoose.connect(config.db, {useNewUrlParser: true}, function(err){
    if(err){
        console.log('mongodb connection error : '+err.message);
    }else{
        console.log('mongodb connection successful.');
    }
});

module.exports = config;