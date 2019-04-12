const {Board: FirmataBoard} = require('firmata');
const {Board: J5Board, Led: {RGB: RGBLed}} = require("johnny-five");
const {SerialPort: VirtualSerialPort} = require('udp-serial');

//create the udp serialport and specify the host and port to connect to
const UDPSerialPort = new VirtualSerialPort({
    host: '192.168.4.1',
    type: 'udp4',
    port: 1025
});
console.log('init');

const nodeMCUBoard = new FirmataBoard(UDPSerialPort);

nodeMCUBoard.once('ready', function () {
    console.log('NodeMCU ready!');
    console.log(
        nodeMCUBoard.firmware.name + "-" +
        nodeMCUBoard.firmware.version.major + "." +
        nodeMCUBoard.firmware.version.minor
    );
    nodeMCUBoard.isReady = true;

    const arduinoUno = new J5Board({
        io: nodeMCUBoard,
        timeout: 1e5,
        repl: false
    });

    arduinoUno.on('ready', function () {
        console.log('UNO ready!');

        const rgb = new RGBLed([5, 6, 3]);
        const randomColor = () => Math.random().toString(16).substr(-6);

        this.loop(100, function () {
            const countedColor = randomColor();
            console.log('countedColor', countedColor);
            rgb.color(countedColor);
        });
    });

});
