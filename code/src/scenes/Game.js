import 'phaser';
import Knight from '../entities/Knight';

export default class BootScene extends Phaser.Scene {
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
  }

  buildLevel() {
    this.map = this.make.tilemap({ key: 'level-1' });
    this.map;
    const groundTiles = this.map.addTilesetImage('world-1', 'world-1-sheet');
    const backgroundTiles = this.map.addTilesetImage('clouds', 'clouds-sheet');

    const backgroundLayer = this.map.createStaticLayer(
      'Background',
      backgroundTiles
    );
    backgroundLayer.setScrollFactor(0.6);

    const groundLayer = this.map.createStaticLayer('Ground', groundTiles);
    groundLayer.setCollision([1, 2, 4], true);

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

    this.map.createStaticLayer('Foreground', groundTiles);

    // const debugGraphics = this.add.graphics();
    // groundLayer.renderDebug(debugGraphics);
  }

  addPlayer() {
    this.knight = new Knight(
      this,
      this.mapObjects.Start.x,
      this.mapObjects.Start.y
    );

    this.player = this.knight;

    this.physics.add.collider(
      this.player,
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
    // this.cameras.main.setZoom(2);
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
