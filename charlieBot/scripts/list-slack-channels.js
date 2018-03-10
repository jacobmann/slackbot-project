// Description:
//    Example scripts for you to examine and try out.
// commands:
var authKey = require('../../authKey.js')
module.exports = function (robot) {
  robot.hear(/bootcampers/i, function (res) {
    res.send("It's going");
  });
  robot.respond(/list channels/i, function (res) {
    var slackURL = "https://slack.com/api/channels.list?token=" + authKey.authKey
    robot.http(slackURL)
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .get()(function (err, response, body) {
        if (err) {
          robot.logger.info(err)
          res.send("Something went wrong")
        } else if (response.statusCode === 200) {
          var data = JSON.parse(body);
          for (var i = 0; i < data.channels.length; i++) {
            res.send("*" + data.channels[i].name+ "*" + ": " + data.channels[i].purpose.value);
          }
          robot.logger.info(data.channels);
          // res.send(JSON.stringify(data));
        } else {
          robot.logger.info(body + response.statusCode)
          res.send("Something went wrong")
        }
      });
  });
};