require('dotenv').config({path: '.env'});
const express = require('express');
const config = require('../config/mongodb');
const mongoose = require('mongoose');
const moment = require('moment');
const LogSearchCustomerModel = require('../models/LogSearchCustomerModel');
const LogSearchOrderModel = require('../models/LogSearchOrderModel');
const LogMenuModel = require('../models/LogMenuModel');
const LogExportModel = require('../models/LogExportModel');
const LogLoginModel = require('../models/LogLoginModel');
const LineNotifyService = require('../services/LineNotifyService');
const helper_util = require('../helpers/util');

module.exports = {
  addLogSearchCustomer: function (data) {
    require('../config/logger').init();
    const logger = require('../config/logger').get();
    const LogSearchCustomer = new LogSearchCustomerModel(data);
    let datalog_str = JSON.stringify(data);
    LogSearchCustomer.save(function (err,resd) {
      if(err){
        logger.error('addLog SearchCustomer error | Request: '+ datalog_str +' | Response: '+ err.message);
        return;
      }else{
        let d_str = JSON.stringify(resd);
        logger.info('addLog SearchCustomer success | Request: '+ datalog_str +' | Response: '+ d_str);
        //--- Line Notify ---
        let d_json = JSON.parse(d_str);
        delete d_json.datetime;
        let line_str = JSON.stringify(d_json);
        if(d_json.rows_of_result > parseInt(process.env.ROWS_OF_RESULT_LINE_NOTIFY)){
          let str = line_str;
          let map = {
              '{"' : '',
              '"}' : '',
              '":"' : ': ',
              '":' : ': ',
              '","' : '\n',
              ',"' : '\n',
          };
          let s = helper_util.replaceAll(str, map);
          const line_message = `*ค้นหาลูกค้า*\n`+ s;
          LineNotifyService.sendMessage(line_message);
        }
        //--- End Line Notify ---
      }
    });
  },
  addLogSearchOrder: function (data) {
    require('../config/logger').init();
    const logger = require('../config/logger').get();
    const LogSearchOrder = new LogSearchOrderModel(data);
    let datalog_str = JSON.stringify(data);
    LogSearchOrder.save(function (err,resd) {
      if(err){
        logger.error('addLog SearchOrder error | Request: '+ datalog_str +' | Response: '+ err.message);
        return;
      }else{
        let d_str = JSON.stringify(resd);
        logger.info('addLog SearchOrder success | Request: '+ datalog_str +' | Response: '+ d_str);
        //--- Line Notify ---
        let d_json = JSON.parse(d_str);
        delete d_json.datetime;
        let line_str = JSON.stringify(d_json);
        if(d_json.rows_of_result > parseInt(process.env.ROWS_OF_RESULT_LINE_NOTIFY)){
          let str = line_str;
          let map = {
              '{"' : '',
              '"}' : '',
              '":"' : ': ',
              '":' : ': ',
              '","' : '\n',
              ',"' : '\n',
          };
          let s = helper_util.replaceAll(str, map);
          const line_message = `*ค้นหารายการสั่งซื้อ*\n`+ s;
          LineNotifyService.sendMessage(line_message);
        }
        //--- End Line Notify ---
      }
    });
  },
  addLogMenu: function (data) {
    require('../config/logger').init();
    const logger = require('../config/logger').get();
    const LogMenu = new LogMenuModel(data);
    let datalog_str = JSON.stringify(data);
    LogMenu.save(function (err,resd) {
      if(err){
        logger.error('addLog Menu error | Request: '+ datalog_str +' | Response: '+ err.message);
        return;
      }else{
        let d_str = JSON.stringify(resd);
        logger.info('addLog Menu success | Request: '+ datalog_str +' | Response: '+ d_str);
      }
    });
  },
  addLogExport: function (data) {
    require('../config/logger').init();
    const logger = require('../config/logger').get();
    const LogExport = new LogExportModel(data);
    let datalog_str = JSON.stringify(data);
    LogExport.save(function (err,resd) {
      if(err){
        logger.error('addLog Export error | Request: '+ datalog_str +' | Response: '+ err.message);
        return;
      }else{
        let d_str = JSON.stringify(resd);
        logger.info('addLog Export success | Request: '+ datalog_str +' | Response: '+ d_str);
      }
    });
  },
  addLogLogin: function(data) {
    require('../config/logger').init();
    const logger = require('../config/logger').get();
    if(data.login_type == 'callcenter'){ //login callcenter
      LogLoginModel.findOne({session_id: data.session_id}, function(err,obj) {
        if(err){
          logger.error('addLog Login FineOne error | Request: '+ session_id +':'+ data.session_id +' | Response: '+ err.message);
        }else{
          if(!obj){
            const LogLogin = new LogLoginModel(data);
            let datalog_str = JSON.stringify(data);
            LogLogin.save(function (err,resd) {
              if(err){
                logger.error('addLog Login error | Request: '+ datalog_str +' | Response: '+ err.message);
                return;
              }else{
                let d_str = JSON.stringify(resd);
                logger.info('addLog Login success | Request: '+ datalog_str +' | Response: '+ d_str);
              }
            });
          }//!obj
        }
      });
    }else{ //login direct
      const LogLogin = new LogLoginModel(data);
      let datalog_str = JSON.stringify(data);
      LogLogin.save(function (err,resd) {
        if(err){
          logger.error('addLog Login direct error | Request: '+ datalog_str +' | Response: '+ err.message);
          return;
        }else{
          let d_str = JSON.stringify(resd);
          logger.info('addLog Login direct success | Request: '+ datalog_str +' | Response: '+ d_str);
        }
      });
    }
  }

};