export default {
  type: Phaser.AUTO,
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#33A5E7',
  render: {
    pixelArt: true,
    roundPixels: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 750,
      },
      debug: true,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticdBody: true,
    },
  },
};
