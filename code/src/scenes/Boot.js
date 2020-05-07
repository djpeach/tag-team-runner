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
    this.load.spritesheet('world-1-sheet', 'assets/tilesets/world-1.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });
    this.load.image('clouds-sheet', 'assets/tilesets/clouds.png');
  }

  loadCharacters() {
    this.loadKnight();
  }

  loadKnight() {
    this.load.spritesheet(
      'knight-idle-sheet',
      'assets/characters/knight/idle.png',
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

  loadNinja() {}

  animateCharacters() {
    this.animateKnight();
  }

  animateKnight() {
    this.anims.create({
      key: 'knight-idle',
      frames: this.anims.generateFrameNumbers('knight-idle-sheet'),
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
}
