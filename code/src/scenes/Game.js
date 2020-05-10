import 'phaser';
import Knight from '../entities/Knight';
import Ninja from '../entities/Ninja';

export default class GameScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {}

  preload() {
    this.scale.on('resize', this.resize, this);

    this.cursorKeys = this.input.keyboard.addKeys({
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
    this.buildLevel();
    this.addPlayer();
    this.configureCamera();
    this.input.keyboard.on(
      'keydown',
      function (e) {
        switch (e.code) {
          case 'Numpad1':
          case 'One':
            this.switchToKnight();
            break;
          case 'Numpad2':
          case 'Two':
            this.switchToNinja();
            break;
        }
      },
      this
    );
  }

  buildLevel() {
    this.map = this.make.tilemap({ key: 'level-2' });
    const groundTiles = this.map.addTilesetImage('level-tiles', 'level-tiles-sheet');
    const backgroundTiles = this.map.addTilesetImage('clouds', 'clouds-sheet');

    const groundLayer = this.map.createStaticLayer('Ground', groundTiles);
    groundLayer.setCollisionByExclusion([-1], true);

    const backgroundLayer = this.map.createStaticLayer(
      'Background',
      backgroundTiles
    );
    backgroundLayer.setScrollFactor(0.6);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.physics.world.setBoundsCollision(true, true, false, true);

    this.mapObjects = {};
    this.map.getObjectLayer('Objects').objects.forEach((val, i, arr) => {
      if (val.name === 'Start') {
        this.mapObjects.Start = val;
      }
    });

    // const debugGraphics = this.add.graphics();
    // groundLayer.renderDebug(debugGraphics);
  }

  addPlayer() {
    this.knight = new Knight(
      this,
      this.mapObjects.Start.x,
      this.mapObjects.Start.y
    );

    this.knight.active = false;
    this.knight.alpha = 0;

    this.ninja = new Ninja(
      this,
      this.mapObjects.Start.x,
      this.mapObjects.Start.y
    );

    this.player = this.ninja;

    this.physics.add.collider(
      this.knight,
      this.map.getLayer('Ground').tilemapLayer
    );
    this.physics.add.collider(
      this.ninja,
      this.map.getLayer('Ground').tilemapLayer
    );
  }

  configureCamera() {
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.startFollow(this.player, true);
  }

  switchToKnight() {
    this.player.active = false;
    this.player.alpha = 0;
    this.knight.active = true;
    this.knight.alpha = 1;
    this.knight.setVelocity(
      this.player.body.velocity.x,
      this.player.body.velocity.y
    );
    this.knight.setAcceleration(
      this.player.body.acceleration.x,
      this.player.body.acceleration.y
    );
    this.knight.setPosition(this.player.x, this.player.y);
    this.player = this.knight;
    this.cameras.main.startFollow(this.player);
  }

  switchToNinja() {
    this.player.active = false;
    this.player.alpha = 0;
    this.ninja.active = true;
    this.ninja.alpha = 1;
    this.ninja.setVelocity(
      this.player.body.velocity.x,
      this.player.body.velocity.y
    );
    this.ninja.setAcceleration(
      this.player.body.acceleration.x,
      this.player.body.acceleration.y
    );
    this.ninja.setPosition(this.player.x, this.player.y);
    this.player = this.ninja;
    this.cameras.main.startFollow(this.player);
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
