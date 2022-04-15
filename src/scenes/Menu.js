class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select", "./assets/select.wav");
        this.load.audio("sfx_explosion", "./assets/explosion.wav");
        this.load.audio("sfx_rocket", "./assets/rocketShoot.wav");
        this.load.audio("bg_music", "./assets/04All-of-Us.mp3")

        // load title images
        this.load.image("title", "./assets/title.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield-bg", "./assets/starfield-bg.png");
        this.load.image("starfield-stars", "./assets/starfield-stars.png");
        this.load.image("starfield-overlay", "./assets/starfield-overlay.png");

    }

    create() {
        let menuConfig = {
            fontFamily: "Consolas",
            fontSize: "20px",
            color: "white",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
                left: 10,
                right: 10
            },
            fixedWidth: 0,
            wordWrap: {
                width: game.config.width - borderUISize*2
            }
        }

        // audio
        music = this.sound.add("bg_music", {volume: 0.5});
        music.play();
        
        // background
        this.starfieldBG = this.add.tileSprite(0, 0, 640, 480, "starfield-bg").setOrigin(0, 0);
        this.starfieldOverlay = this.add.tileSprite(0, 0, 640, 480, "starfield-overlay").setOrigin(0, 0);
        this.starfieldStars = this.add.tileSprite(0, 0, 640, 480, "starfield-stars").setOrigin(0, 0);

        // moving spaceships
        this.ship01 = this.add.image(game.config.width, Phaser.Math.Between(0, game.config.height), "spaceship").setOrigin(0.5);
        this.ship02 = this.add.image(game.config.width+ borderUISize, Phaser.Math.Between(0, game.config.height), "spaceship").setOrigin(0.5);

        // menu logo
        this.add.sprite(game.config.width/2, borderPadding + borderUISize*4, "title").setOrigin(0.5);

        // show menu text
        this.menuText = this.add.text(game.config.width/2, game.config.height/3*2, "Use ← → keys to move & (F) to fire", menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/3*2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);

        // menu box
        this.frame = this.add.rectangle(game.config.width/2, game.config.height/2+borderUISize*3, this.menuText.width, game.config.height/4).setOrigin(0.5);
        this.frame.isStroked = true;
        this.frame.strokeColor = -1;
        this.frame.lineWidth = 3;


        // define menu keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 5000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        // moving spaceship
        this.ship01.x -= 2;
        if(this.ship01.x <= 0 - this.ship01.width) {
            this.ship01.x = game.config.width; // essentially resets x position
            this.ship01.y = Phaser.Math.Between(0, game.config.height);
        };
        this.clock = this.time.delayedCall(2000, () => {
            this.ship02.x -= 2
        });
        if(this.ship02.x <= 0 - this.ship02.width) {
            this.ship02.x = game.config.width; // essentially resets x position
            this.ship02.y = Phaser.Math.Between(0, game.config.height);
        };

        // parallax bg
        this.starfieldBG.tilePositionX -= 2;
        this.starfieldStars.tilePositionX -= 1;
        this.starfieldOverlay.tilePositionX -= 3; 
    }
};