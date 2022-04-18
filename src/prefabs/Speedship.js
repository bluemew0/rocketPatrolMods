class Speedship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = 80; // each ship has a different point value based on height
        this.time = 5000;
        this.moveSpeed = 4; // movement by pixels per frame
  
    }

    update() {
        // left movement for spaceship
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width; // essentially resets x position
        } 
    }

    reset() {
        this.x = game.config.width;
    }
};