import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.loadWorld();
    this.loadCharacters();
  }

  create() {
    this.animateCharacters();
    this.scene.start('Game');
  }

  loadWorld() {
    this.load.tilemapTiledJSON('level-1', 'assets/tilemaps/level-1.json');
    this.load.tilemapTiledJSON('level-2', 'assets/tilemaps/level-2.json');
    this.load.spritesheet('world-1-sheet', 'assets/tilesets/world-1.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });
    this.load.spritesheet('level-tiles-sheet', 'assets/tilesets/level-tiles.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0,
    });
    this.load.image('clouds-sheet', 'assets/tilesets/clouds.png');
  }

  loadCharacters() {
    this.loadKnight();
    this.loadNinja();
  }

  loadKnight() {
    this.load.spritesheet(
      'knight-attack-sheet',
      'assets/characters/knight/attack.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'knight-idle-sheet',
      'assets/characters/knight/idle.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'knight-jump-sheet',
      'assets/characters/knight/jump.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'knight-run-sheet',
      'assets/characters/knight/run.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  loadNinja() {
    this.load.spritesheet(
      'ninja-idle-sheet',
      'assets/characters/ninja/idle.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'ninja-run-sheet',
      'assets/characters/ninja/run.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'ninja-jump-sheet',
      'assets/characters/ninja/jump.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'ninja-flip-sheet',
      'assets/characters/ninja/flip.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'ninja-wall-jump-sheet',
      'assets/characters/ninja/wall-jump.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  animateCharacters() {
    this.animateKnight();
    this.animateNinja();
  }

  animateKnight() {
    this.anims.create({
      key: 'knight-attacking',
      frames: this.anims.generateFrameNumbers('knight-attack-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-idling',
      frames: this.anims.generateFrameNumbers('knight-idle-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-jumping',
      frames: this.anims.generateFrameNumbers('knight-jump-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-running',
      frames: this.anims.generateFrameNumbers('knight-run-sheet'),
      frameRate: 10,
      repeat: -1,
    });
  }

  animateNinja() {
    this.anims.create({
      key: 'knight-flipping',
      frames: this.anims.generateFrameNumbers('knight-flip-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-idling',
      frames: this.anims.generateFrameNumbers('knight-idle-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-jumping',
      frames: this.anims.generateFrameNumbers('knight-jump-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-running',
      frames: this.anims.generateFrameNumbers('knight-run-sheet'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'knight-wall-jumping',
      frames: this.anims.generateFrameNumbers('knight-wall-jump-sheet'),
      frameRate: 10,
      repeat: -1,
    });
  }
}
