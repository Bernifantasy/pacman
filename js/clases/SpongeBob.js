import { gameObject } from "./gameObject.js";

export class SpongeBob extends gameObject {
  constructor(row, column, sound, config) {
    super(row, column,config);
    this.direction = 1;
    this.config = config; 
    this.speedBob = config.speedBob;
    this.BobSound = sound;
    this.scoreBob = 0;
    this.BobLives = config.livesBob;
  }

  moveRight() {
    let newCol = this.coordXpixel + this.speedBob;
    if (newCol >= 0) {
      this.direction = 1;
      this.coordXpixel = newCol;
    }
    this.BobSound.play();
  }

  moveLeft() {
    let newCol = this.coordXpixel - this.speedBob;
    if (newCol >= 0) {
      this.direction = 3;
      this.coordXpixel = newCol;
    }
    this.BobSound.play();
  }

  moveUp() {
    let newRow = this.coordYpixel - this.speedBob;
    if (newRow >= 0) {
      this.direction = 4;
      this.coordYpixel = newRow;
    }
    this.BobSound.play();
  }

  moveDown() {
    let newRow = this.coordYpixel + this.speedBob;
    if (newRow >= 0) {
      this.direction = 2;
      this.coordYpixel = newRow;
    }
    this.BobSound.play();
  }

  testCollideRock(roca) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, roca.coordXpixel, roca.coordYpixel);
    if (distancia < this.config.imageSize) {
      this.BobLives--;
      this.spawnBob();
    }
  }

  testCollideBurger(food) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, food.coordXpixel, food.coordYpixel);
    return distancia < this.config.imageSize;
  }

  testCollideBar(bar) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, bar.coordXpixel, bar.coordYpixel);
    return distancia < this.config.imageSize;
  }

  spawnBob() {
    this.coordXpixel = 32;
    this.coordYpixel = 32;
  }
}
