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
          robot.logger.info(response)
          res.send(JSON.stringify(body))
        } else {
          robot.logger.info(body + response.statusCode)
          res.send("Something went wrong")
        }
      });
  });
};