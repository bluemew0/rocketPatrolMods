// rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // add sprite to scene bc it doesn't automatically do that
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add("sfx_rocket", {volume: 0.4}); // but still need to bind to a key
    }
    
    update() {
        // left/right movement
        // as long as rocket is within bounds, changing position for movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding*2;
        }
    };

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*2;
    }
};