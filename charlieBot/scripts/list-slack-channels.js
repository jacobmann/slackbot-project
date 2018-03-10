// Description:
//    Example scripts for you to examine and try out.
// commands:

module.exports = function(robot) {
    robot.hear(/bootcampers/i, function(res) {
        res.send("It's going");
    });
    robot.respond(/list channels/i, function(res) {
        robot.http("https://slack.com/api/channels.list")
        .get()(function(err, response, body) {
          if (err){
            robot.logger.info(err)
            res.send("Something went wrong")
          }else if (response.statusCode===200){
            res.send(JSON.stringify(body))
          }else{
            robot.logger.info(body+response.statusCode)
            res.send("Something went wrong")
          }
        });
      });
};
