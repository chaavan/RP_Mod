class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
        // console.log('MainMenu: constructor')
    }

    init(){
        // console.log('MainMenu: init')
        // this.HP = 100
        // this.EXP = 0
        // console.log(`HP: ${this.HP} EXP:${this.EXP}`)
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion1', './assets/sfx-explosion1.wav')
        this.load.audio('sfx-explosion2', './assets/sfx-explosion2.wav')
        this.load.audio('sfx-explosion3', './assets/sfx-explosion3.wav')
        this.load.audio('sfx-explosion4', './assets/sfx-explosion4.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('bgm', './assets/Background_music.mp3')

    }

    create(){
        // console.log('MainMenu: create')
        this.bgm = this.sound.add('bgm', { volume: 0.5, loop: true });
        this.bgm.play();

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or  → for Expert', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 150, `High Score: ${highScore}`, { fontSize: '28px', color: '#FFF' }).setOrigin(0.5)


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // let playerStats = {
        //     HP: this.HP,
        //     EXP: this.EXP
        // }

        // this.scene.start('playScene', playerStats)
    
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }

}