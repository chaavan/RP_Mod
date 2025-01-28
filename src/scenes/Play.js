class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
        // console.log('Play: constructor')
    }

    init(stats){
        // console.log('Play: init')
        // this.HP = stats.HP
        // this.EXP = stats.EXP
    }

    create(){
        // console.log('Play: create')
        // console.log(`HP: ${this.HP} EXP:${this.EXP}`)
        this.timeBonus = 5
        this.timePenalty = 3
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0)

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket')
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*9, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0)
        this.ship04 = new FastSpaceship(this, game.config.width, borderUISize*7 + borderPadding*6, 'fast_spaceship', 0, 50).setOrigin(0, 0)

        

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.gameOver = false

        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        this.timeLeft = game.settings.gameTimer / 1000
        this.timeText = this.add.text(game.config.width - 200, 55, `Time: ${this.timeLeft}`, scoreConfig)

    }
    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene')
        }
        this.starfield.tilePositionX -= 4
        this.p1Rocket.update()
        this.ship01.update()
        this.ship02.update()
        this.ship03.update()
        this.ship04.update()

        let collision = false

        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
            this.collision = true
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.collision = true
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.collision = true
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.collision = true
        }

        if(this.p1Score > highScore){
            highScore = this.p1Score
        }

        this.timeLeft = Math.ceil((game.settings.gameTimer - this.clock.getElapsed()) / 1000)
        this.timeText.setText(`Time: ${this.timeLeft}`)
    }

    checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true
            } else {
                return false
            }
    }

    shipExplode(ship){
        ship.alpha = 0

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })

        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        const explosionSounds = ['sfx-explosion1', 'sfx-explosion2', 'sfx-explosion3', 'sfx-explosion4']
        const randomSound = explosionSounds[Math.floor(Math.random() * explosionSounds.length)]
        this.sound.play(randomSound)

        game.settings.gameTimer += this.timeBonus * 1000
        this.clock.delay = game.settings.gameTimer
    }
}

