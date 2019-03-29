const express = require('express');
const config = require('../config/mongodb');
const moment = require('moment');
const axios = require('axios');
// const LogModel = require('../models/LogModel');

const dt = moment().format('YYYY-MM-DD HH:mm:ss');
module.exports = {
  login: function (req, res, next) {

    let data = {
      aa: 11,
      bb: 22,
    }
    res.render('login', { data });
    
  }, //method

}
