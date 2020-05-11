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
    this.setSize(9, 26);
    this.setOffset(13, 5);
    this.setOrigin(0.5, 1);

    this.moveState = new StateMachine({
      init: 'grounded',
      transitions: [
        { name: 'jump', from: ['grounded', 'wallGrabbing'], to: 'jumping' },
        { name: 'flip', from: ['jumping', 'falling'], to: 'flipping' },
        { name: 'land', from: ['jumping', 'flipping', 'falling'], to: 'grounded' },
        { name: 'wallGrab', from: ['falling', 'jumping', 'flipping'], to: 'wallGrabbing' },
        { name: 'fall', from: ['wallGrabbing', 'grounded'], to: 'falling' },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          console.log(lifecycle.from, ' -> ', lifecycle.to);
        },
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onFlip: () => {
          this.body.setVelocityY(-400);
        },
        onWallGrab: () => {
          this.body.setVelocity(0, 0);
        },
      },
    });
    this.moveState.predicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      flip: () => {
        return this.input.didPressJump;
      },
      land: () => {
        return this.body.onFloor();
      },
      wallGrab: () => {
        let grabRight = this.body.blocked.right && this.keys.right.isDown;
        let grabLeft = this.body.blocked.left && this.keys.left.isDown;
        return (grabRight || grabLeft) && !this.body.blocked.down && this.body.velocity.y > 0;
      },
      fall: () => {
        return this.body.velocity.y > 0;
      }
    };
  }

  setupAnimations() {
    this.animState = new StateMachine({
      init: 'idle',
      transitions: [
        { name: 'idle', from: ['falling', 'running', 'jumping', 'flipping'], to: 'idling' },
        { name: 'run', from: ['falling', 'idling', 'jumping', 'flipping'], to: 'running' },
        { name: 'jump', from: ['idling', 'running'], to: 'jumping' },
        { name: 'flip', from: ['jumping', 'falling'], to: 'flipping' },
        { name: 'wall-jump', from: ['jumping', 'falling'], to: 'flipping' },
        {
          name: 'fall',
          from: ['idling', 'running', 'jumping'],
          to: 'falling',
        },
        {
          name: 'die',
          from: ['idling', 'running', 'jumping', 'falling'],
          to: 'dead',
        },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          console.log(lifecycle.from, lifecycle.to);
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
          Math.abs(this.body.velocity.x) > 0
        );
      },
      jump: () => {
        return this.body.velocity.y < 0;
      },
      flip: () => {
        return this.body.velocity < 0 && this.moveState.is('flipping')
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
      this.setOffset(10, 5);
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
      this.setOffset(13, 5);
    } else {
      this.body.setAccelerationX(0);
    }
  }
}
