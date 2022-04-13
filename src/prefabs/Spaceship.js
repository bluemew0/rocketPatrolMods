class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue // each ship has a different point value based on height
        this.moveSpeed = game.settings.spaceshipSpeed; // movement by pixels per frame
  
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