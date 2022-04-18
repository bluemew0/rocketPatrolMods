/*
MODS
- tracks a high score that persists across scenes (5)
- copyright free background music (5)
- created a new scrolling tile background sprite (5) (unsure if this one is double dipped)
- allows the player to control the rocket after fire (5)
- displays remaining time in sec on screen (10)
- created a new title screen (10)
- implemented parallax scrolling (10)
- created a new spaceship type--i have called it speedship (20)
- created new artwork for all of the in game assets (20)
- implemented a new timing/scoring mechanism that adds time for successful hits (20)
 
expected total: 105-110

*/

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
let keyF, keyR, keyM, keyLEFT, keyRIGHT;

let highScore = 0;
let music;








