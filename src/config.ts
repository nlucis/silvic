import Phaser from 'phaser';

// devicePixelRatio
// DeviceMotionEvent
// DeviceOrientationEvent

export default {
  type: Phaser.WEBGL,
  parent: 'renderout',
  backgroundColor: '#000000',
  physics: {
    default: 'matter',
    matter: {
      // debug: true,
      gravity: { x: 0, y: 0 },
      plugins: {
        attractors: true
      }
    }
  },
  scale: {
    width: window.innerWidth,
    height: window.innerWidth,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
