class Speedship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = 80; // each ship has a different point value based on height
        this.time = 5000;
        this.moveSpeed = game.settings.speedshipSpeed; // movement by pixels per frame
  
    }

    update() {
        // left movement for spaceship
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width+(game.config.width/2); // essentially resets x position
            this.y = Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderUISize*4);
        } 
    }

    reset() {
        this.x = game.config.width+(game.config.width/2);
        this.y = Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderUISize*4);
    }
};