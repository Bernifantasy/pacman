import {gameObject} from "./gameObject.js";
import { IMAGE_SIZE, WIDTH_CANVAS, HEIGHT_CANVAS } from "../sketch.js";
import { map } from "../sketch.js";

export class Pacman extends gameObject {
  constructor(row, column) {
    super(row, column);
    this.direction=1;
    this.speedPacman = IMAGE_SIZE;
  }

  moveRight() {
    let newCol = this.columnNumber + 1;
    if (newCol < map[0].length && map[this.rowNumber][newCol] !== 1) {
      this.columnNumber = newCol;
      this.coordXpixel = this.columnNumber * IMAGE_SIZE;
    }
    this.direction=1;
  }

  moveLeft() {
    let newCol = this.columnNumber - 1;
    if (newCol >= 0 && map[this.rowNumber][newCol] !== 1) {
      this.columnNumber = newCol;
      this.coordXpixel = this.columnNumber * IMAGE_SIZE;
    }
    this.direction=3;
  }

  moveUp() {
    let newRow = this.rowNumber - 1;
    if (newRow >= 0 && map[newRow][this.columnNumber] !== 1) {
      this.rowNumber = newRow;
      this.coordYpixel = this.rowNumber * IMAGE_SIZE;
    }
    this.direction=4;
  }

  moveDown() {
    let newRow = this.rowNumber + 1;
    if (newRow < map.length && map[newRow][this.columnNumber] !== 1) {
      this.rowNumber = newRow;
      this.coordYpixel = this.rowNumber * IMAGE_SIZE;
    }
    this.direction=2;
  }

  testCollideRock(roca){
    let distancia = dist(this.coordXPixels, this.coordYPixels, roca.coordXPixels, roca.coordYPixels);

    if (distancia<IMAGE_SIZE){
      switch(this.direction){
        case 1: this.coordXPixels = this.coordXPixels - this.speedPacman;
          break;
        case 2: this.coordYPixels = this.coordYPixels + this.speedPacman;
          break;
        case 3: this.coordXPixels = this.coordXPixels + this.speedPacman;
          break;
        case 4: this.coordYPixels = this.coordYPixels - this.speedPacman;
          break;
      }
    }else {
      console.log("");
    }
  }
}
