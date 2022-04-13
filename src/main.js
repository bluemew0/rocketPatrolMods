let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    parent: "rocket-patrol-game",
    backgroundColor: "0b1927"
};

let game = new Phaser.Game(config);

// UI sizes
let borderUISize = game.config.height / 15; // the border is 1/15 of the height
let borderPadding = borderUISize / 3; // padding is 1/45 of the game height

// keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

