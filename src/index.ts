import Phaser from 'phaser';
import config from './config';
import Base from './core/base';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      Base
    ]
  })
);
