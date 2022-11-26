import Phaser from 'phaser';
import ScaleFactor from '../util/ScaleFactor';
import Color from '../util/Color';


export default class Base extends Phaser.Scene {
  constructor() {super('Base');}

  // * }~{ [|] (:) /.\

  private gfx?: Phaser.GameObjects.Graphics;
  private draw(config: {fill?: number, line?: number}, lineWidth: number): Phaser.GameObjects.Graphics {
    if (!this.gfx) {
      this.gfx = this.add.graphics();
    }
    config.fill && this.gfx.fillStyle(config.fill);
    config.line && this.gfx.lineStyle(lineWidth, config.line);
    return this.gfx;
  }

  init(): void {
    // Allocate Grpahics
    this.gfx = this.add.graphics();

    // Configure Context
    const ctx = this.game.canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
    this.cameras.main.setRoundPixels(true);
  }

  preload() {

    // Use sub-canvases for procedurally generating textures to use throughout ⦿
    const canvas = this.textures.createCanvas('tex', 100, 100);
    canvas?.setFilter(Phaser.Textures.FilterMode.LINEAR);
    const ctx = canvas?.getContext();
    if (ctx) {
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;

      ctx.fillStyle   = '#FF0000';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth   = 3;

      // outer circle
      ctx.beginPath();
      ctx.arc(50, 50, 25, 0, 360);
      ctx.stroke();
      ctx.closePath();

      // inner circle 
      ctx.beginPath();
      ctx.arc(50, 50, 16, 0, 360);
      ctx.fillStyle ='#FFFFFF';
      ctx.fill();
      ctx.closePath();

      ctx.stroke();
      canvas?.refresh();
    }
  }

  private tex?: Phaser.GameObjects.RenderTexture;

  create() {

    // Making a gameobject from texture
    this.tex = this.add.renderTexture(0, 0, 1, 1);
    this.tex.setTexture('tex');
    this.matter.add.gameObject(this.tex, {circleRadius: 25+3});

    // Making a gameobject from quick methods
    const innerCircle = this.add.circle(0, 100, 16, 0xFFFFFF);
    const outerCircle = this.add.circle(0, 100, 25, 0xFFFFFF, 0);
    outerCircle.setStrokeStyle(3, 0xFFFFFF);

    // Render Texture approach is visibly superior
  }

  update(): void {
    this.cameras.main.centerOn(0,0);  
  }
}
