const {EventEmitter: Emitter } = require("events");
const {Board, Sensor: {Digital:DigitalSensor}} = require('johnny-five');
const board = new Board();
const robot = require("robotjs");

const initPotentiometer = () => {
    var encoder = new Encoder({
        a: 8,
        b: 9
    });


    encoder.on("change", function() {
        console.log("Encoder At: %d", this.value);
    });

    encoder.on("rotation", function() {
        console.log("Rotations: %d", Math.abs(this.value / 80));
    });
};


// Rotary Encoder
function Encoder(opts) {
    Emitter.call(this);

    var last = 0;
    var lValue = 0;
    var value = 0;
    var rotation = 0;

    var a = new DigitalSensor(opts.a);
    var b = new DigitalSensor(opts.b);

    var handler = function() {
        this.emit("data", this.value);

        var MSB = a.value;
        var LSB = b.value;
        var pos, turn;

        if (LSB === 1) {
            pos = MSB === 1 ? 0 : 1;
        } else {
            pos = MSB === 0 ? 2 : 3;
        }

        turn = pos - last;

        if (Math.abs(turn) !== 2) {
            if (turn === -1 || turn === 3) {
                value++;
                // Care here
                robot.keyTap('audio_vol_up')
            } else if (turn === 1 || turn === -3) {
                robot.keyTap('audio_vol_down');
                value--;
            }
        }

        last = pos;

        if (lValue !== value) {
            this.emit("change", value);
        }

        if (value % 80 === 0 && value / 80 !== rotation) {
            rotation = value / 80;
            this.emit("rotation");
        }

        lValue = value;
    }.bind(this);

    a.on("data", handler);
    b.on("data", handler);

    Object.defineProperties(this, {
        value: {
            get: function() {
                return value;
            }
        }
    });
}

Encoder.prototype = Object.create(Emitter.prototype, {
    constructor: {
        value: Encoder
    }
});

board.on("ready", function () {
    initPotentiometer()
});

