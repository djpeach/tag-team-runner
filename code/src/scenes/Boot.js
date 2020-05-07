import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.spritesheet(
      'knight-idle-sheet',
      'assets/characters/knight/idle.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  create() {
    this.scene.start('Game');
  }
}
