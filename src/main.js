// Rocket Rampage Reloaded 
// Name: Chaavan Sure
// Date: 1/13/2025
// Time Required: 12 Hours

// Mods:
//     1. Track a high score that persists across scenes and display it in the UI (1)
//     2. Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
//     3. Allow the player to control the Rocket after it's fired (1)
//     4. Implement the 'FIRE' UI text from the original game (1)
//     5. Create 4 new explosion sound effects and randomize which one plays on impact (3)
//     6. Display the time remaining (in seconds) on the screen (3)
//     7. Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//     8. Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

// Total-Points: 
//     5 + 5 + 3 + 3 + 1 + 1 + 1 + 1 = 20


"use strict"

let config = {
    type: Phaser.AUTO, 
    width: 640,
    height: 480,
    scene: [  Menu, Play ]
}

let game = new Phaser.Game(config)

let highScore = 0

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

