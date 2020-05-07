import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
  }

  create () {
    this.scene.start('Game');
  }
};
