import 'phaser';

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritesheet, frame) {
    super(scene, x, y, spritesheet, frame);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setScale(2);
    this.setCollideWorldBounds(true);

    this.keys = this.scene.cursorKeys;
    this.input = {};

    this.setupMovement();
    this.setupAnimations();
  }

  setupMovement() {}
  setupAnimations() {}

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    for (const t of this.moveState.transitions()) {
      if (t in this.moveState.predicates && this.moveState.predicates[t]()) {
        this.moveState[t]();
        break;
      }
    }

    for (const t of this.animState.transitions()) {
      if (t in this.animState.predicates && this.animState.predicates[t]()) {
        this.animState[t]();
        break;
      }
    }
  }
}
