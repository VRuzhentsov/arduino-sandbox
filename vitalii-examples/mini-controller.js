const {Board, Joystick} = require('johnny-five');
const board = new Board();
const robot = require("robotjs");


board.on("ready", function () {
    const joystick = new Joystick({
        // [ x, y ]
        pins: ["A0", "A1"],
        invertX: true
    });
    console.log("Ready");
    joystick.on('change', function ({x, y}) {
        // process.stdout.write('\033c');
        // console.log('change', arguments);


        if(x > 0.2){
            robot.keyTap("up");
        }

        if(x < -0.2){
            robot.keyTap("down");
        }

        if(y > 0.2){
            robot.keyTap("right");
        }

        if(y < -0.2){
            robot.keyTap("left");
        }
    });
});

