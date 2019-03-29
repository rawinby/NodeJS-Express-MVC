const axios = require('axios');
const helper_util = require('../helpers/util');

module.exports = {
  sendMessage: function (message) {
    if(process.env.LINE_NOTIFY_OPEN == 'true'){
      require('../config/logger').init();
      const logger = require('../config/logger').get();
      var s = helper_util.replaceAll(message, {'\n':' '});
      axios({
        method: 'POST',
        url: 'https://notify-api.line.me/api/notify',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': 'Bearer '+process.env.TOKEN_LINE_NOTIFY, //token
        },
        params:{
          message: message
        }
      })
      .then(function(res) {
        logger.info('Line sendMessage success | Request: ' + s + ' | Response: '+ JSON.stringify(res.data));
      })
      .catch(function(err) {
        logger.error('Line sendMessage error | Request: ' + s + ' | Response: ' + JSON.stringify(err.message));
      });
    }
  }//method
};