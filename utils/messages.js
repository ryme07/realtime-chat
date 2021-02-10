const moment = require("moment");
moment.locale("fr");

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("HH:mm"),
  };
}

module.exports = formatMessage;
