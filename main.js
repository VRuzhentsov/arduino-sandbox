const { Board, Led : { RGB } } = require('johnny-five');
const board = new Board();


board.on("ready", function() {
    const rgb = new RGB([6, 5, 3]);
    const randomColor = () => Math.random().toString(16).substr(-6);

    this.loop(100, function() {
        const countedColor = randomColor();
        console.log('countedColor', countedColor);
        rgb.color(countedColor);
    });

});

