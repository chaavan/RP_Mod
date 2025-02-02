class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2
        // this.clock = scene.time.addEvent({delay:game.settings.gameTimer})
        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(){
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring){
            this.isFiring = true
            this.sfxShot.play()
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false
            this.y = game.config.height - borderUISize -borderPadding
            game.settings.gameTimer -= this.scene.timePenalty * 1000
            this.scene.clock.delay = game.settings.gameTimer
        }
        if (this.isFiring && keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        if (this.isFiring && keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
    }

    reset(){
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}