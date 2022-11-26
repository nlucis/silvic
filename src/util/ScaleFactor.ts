export default class ScaleFactor {
  public static WIDTH: number;
  public static HEIGHT: number;
  public static BASE: number;

  // Adds non-css padding to all scale factors
  private static pad: number;

  static {
    this.pad = 12; // pixels
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    this.BASE = this.WIDTH < this.HEIGHT ? this.WIDTH : this.HEIGHT;
    this.BASE -= this.BASE % 10; // round to nearest multiple of 10
  }

  // Takes in a number as a percentage and returns that pixel size based on the viewport
  public static of(n: number): number {
    return ((n * 0.01) * this.BASE * 0.5) - this.pad;
  }
}