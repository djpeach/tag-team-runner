import 'phaser';
import StateMachine from 'javascript-state-machine';
import Character from './Character';

export default class Ninja extends Character {
  constructor(scene, x, y) {
    super(scene, x, y, 'ninja-idle-sheet', 0);
  }

  setupMovement() {
    super.setupMovement();
    this.setMaxVelocity(550, 550);
    this.setDragX(5000);
    this.setSize(15, 29);
    this.setOffset(4, 2);
    this.setOrigin(0.5, 1);

    this.moveState = new StateMachine({
      init: 'grounded',
      transitions: [
        { name: 'jump', from: ['grounded'], to: 'jumping' },
        { name: 'land', from: ['jumping'], to: 'grounded' },
      ],
      methods: {
        onJump: () => {
          this.body.setVelocityY(-400);
        },
      },
    });
    this.moveState.predicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      land: () => {
        return this.body.onFloor();
      },
    };
  }

  setupAnimations() {
    this.animState = new StateMachine({
      init: 'idle',
      transitions: [
        { name: 'idle', from: ['falling', 'running', 'jumping'], to: 'idle' },
        { name: 'run', from: ['falling', 'idle', 'jumping'], to: 'running' },
        { name: 'jump', from: ['idle', 'running'], to: 'jumping' },
        {
          name: 'fall',
          from: ['idle', 'running', 'jumping'],
          to: 'falling',
        },
        {
          name: 'die',
          from: ['idle', 'running', 'jumping', 'falling'],
          to: 'dead',
        },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          this.anims.play(`ninja-${lifecycle.to}`);
        },
      },
    });

    this.animState.predicates = {
      idle: () => {
        return this.body.onFloor() && this.body.velocity.x === 0;
      },
      run: () => {
        return (
          this.body.onFloor() &&
          // check velocity exists, and matches the flip value
          Math.sign(this.body.velocity.x) === (this.flipX ? -1 : 1) &&
          false
        );
      },
      jump: () => {
        return this.body.velocity.y < 0 && false;
      },
      fall: () => {
        return this.body.velocity.y > 0 && false;
      },
    };
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      // acceleration is per second, so 1000 units/s = 250 in .25 seconds, 500 in .5 seconds, 1500 in 1.5 seconds, etc
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);
      this.setOffset(10, 2);
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
      this.setOffset(4, 2);
    } else {
      this.body.setAccelerationX(0);
    }
  }
}
