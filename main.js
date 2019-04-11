const {Board: FirmataBoard} = require('firmata');
const {Board: J5Board, Led: {RGB:RGBLed}} = require("johnny-five");
console.log('init');

const {EtherPortClient} = require('etherport-client');

const etherPortClient = new EtherPortClient({
    host: '192.168.193.10',
    port: 3030
});

const nodeMCUBoard = new FirmataBoard(etherPortClient);

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
