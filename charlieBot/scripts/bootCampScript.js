// Description:
//    Example scripts for you to examine and try out.
// commands:

module.exports = function(robot) {
    robot.hear(/bootcampers/i, function(res) {
        res.send("It's going");
    });
};