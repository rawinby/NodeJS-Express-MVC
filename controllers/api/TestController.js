const express = require('express');
const config = require('../../config/mongodb');
const moment = require('moment');
const axios = require('axios');
// const LogModel = require('../models/LogModel');

const dt = moment().format('YYYY-MM-DD HH:mm:ss');
module.exports = {
  welcome: function (req, res, next) {

      res.json({
        message: 'Welcome',
      });
    
  }, //method
}
