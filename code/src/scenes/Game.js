import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {}

  preload() {
    this.scale.on('resize', this.resize, this);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      b_1: Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
      b_2: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
      b_3: Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  create() {
    this.knight = this.physics.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'knight-idle-sheet',
      0
    );
    this.knight.setScale(2);
  }

  update(time, delta) {}

  resize(gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width;
    let height = gameSize.height;
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }
}
