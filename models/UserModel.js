const mongoose = require('mongoose');
const moment = require('moment');
const LogLoginSchema = new mongoose.Schema({
  first_name: {type: String,required: true},
  last_name: {type: String,required: true},
  username: {type: String,required: true},
  datetime: {type: Date,default: Date.now()},
}, {
  collection: 'user',
  versionKey: false
});

//middle ware in serial
LogLoginSchema.pre('save', function preSave(next){
  let date_now = Date.now();
  this.datetime = date_now;
  this.datetime_text = moment(date_now).format('YYYY-MM-DD HH:mm:ss');
  next();
});

module.exports = mongoose.model('user', LogLoginSchema);
