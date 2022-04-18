class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tiles sprites
        //load.image(name, URL)
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield-bg", "./assets/starfield-bg.png");
        this.load.image("starfield-stars", "./assets/starfield-stars.png");
        this.load.image("starfield-overlay", "./assets/starfield-overlay.png");

        //load.spritesheet(name, URL, {width, height, start, end})
        this.load.spritesheet("explosion", "./assets/explosion-sheet.png", {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 10});
        this.load.spritesheet("animated-spaceship", "./assets/spaceship-sheet.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 5});
    }

    create() {
        
        // place starfield tile
        //add.tileSprite(x, y, width, height, key name)
        this.starfieldBG = this.add.tileSprite(0, 0, 640, 480, "starfield-bg").setOrigin(0, 0);
        this.starfieldOverlay = this.add.tileSprite(0, 0, 640, 480, "starfield-overlay").setOrigin(0, 0);
        this.starfieldStars = this.add.tileSprite(0, 0, 640, 480, "starfield-stars").setOrigin(0, 0);
        
        // UI frame
        this.frame = this.add.rectangle(borderUISize+borderPadding, borderUISize + borderPadding, game.config.width-borderUISize*2-borderPadding*2, borderUISize * 2).setOrigin(0, 0);
        this.frame.isStroked = true;
        this.frame.strokeColor = -1;
        this.frame.lineWidth = 3;

        // creating an animation
        // anims.create(name, # of frames, frame rate)
        // anims.generateFrameNumbers(name of animation, {start, end, first})
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 10 , first: 0}), 
            frameRate: 20
        });
        this.anims.create({
            key: "flame",
            frames: this.anims.generateFrameNumbers("animated-spaceship", 
                {start: 0, end: 5, first: 0}),
            frameRate: 30
        })

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, "animated-spaceship", 1, 30, 3000).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "animated-spaceship", 1, 20, 1500).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderUISize*4, "animated-spaceship", 1, 10, 1000).setOrigin(0, 0);
        this.ship01.anims.play("flame");
        this.ship02.anims.play("flame");
        this.ship03.anims.play("flame");


        // speedship
        this.speedshipLoop = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.speedship = new Speedship(this, game.config.width, Phaser.Math.Between(borderUISize * 3 + borderPadding, borderUISize*4), "spaceship", 0)
            },
            loop: true 
        });


        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        /* rectangle(x, y, width, height, color)
        1. rectangle at (0,0) and is as long as game width and height is defned border size
        2. rectangle at (0, top corner of border thickness at bottom) with same dimensions as above
        3. rectangle at (0,0) and width is border size
        4. rectangle at border width from right edge and ends at the bottom of the screen
        */

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding*2, "rocket").setOrigin(0.5, 0);
        // constructor(scene, x, y, texture, frame)

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize and display score
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            color: "white",
            align: "center"
        };
        let headerConfig = {
            fontFamily: "Courier",
            fontSize: "15px",
            color: "white"
        };

        this.add.text(borderUISize + borderPadding*2, borderUISize + borderPadding*2, "SCORE", headerConfig);
        this.scoreLeft = this.add.text(borderUISize + borderPadding*2, borderUISize + borderPadding*3.5, this.p1Score, scoreConfig);
        // scoreLeft scene property so it can be updated elsewhere

        // high score
        this.add.text(game.config.width - borderUISize*3, borderUISize + borderPadding*2, "HIGH", headerConfig);
        this.add.text(game.config.width - borderUISize*3 + borderPadding*2, borderUISize + borderPadding*3.5, highScore, scoreConfig);

        this.gameOver = false;
        // 60 sec play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to restart\nPress (M) to go back to Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            highScore = this.p1Score;
        }, null, this);
        // delayedCall(delay time, callback function, and arguments for the callback (null), callback context (this)) calls a function after a delay

        this.countdown = game.settings.gameTimer;
        this.add.text(game.config.width/2 - borderPadding, borderUISize + borderPadding*2, "TIME", headerConfig);
        this.timer = this.add.text(game.config.width/2, borderUISize+borderPadding*3.5, this.countdown, scoreConfig);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            music.stop();
            this.scene.start("menuScene");
        }

        // parallax bg
        this.starfieldBG.tilePositionX -= 2;
        this.starfieldStars.tilePositionX -= 1;
        this.starfieldOverlay.tilePositionX -= 3; 

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.timerColor();
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.timerColor();
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.timerColor();
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        

        if (this.countdown != 0) {
            this.countdown = this.clock.getOverallRemainingSeconds();
            this.timer.text = Math.round(this.countdown);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temp hide ship
        ship.alpha = 0;

        this.cameras.main.shake(50);

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();   // resets ship position
            ship.alpha = 1;    
            boom.destroy();     // removes explosion sprite
        })
        
        // add to score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play("sfx_explosion", {volume: 0.4});

        // add to time
        this.clock.delay += ship.time;
    }

    timerColor() {
        // changes the color of the timer
        this.timer.setColor("#43EF98");
        this.time.delayedCall(500, () => {
            this.timer.setColor("white");
        })
    }
};