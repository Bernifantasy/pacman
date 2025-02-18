import { gameObject } from "./gameObject.js";
import { IMAGE_SIZE } from "../sketch.js";


export class SpongeBob extends gameObject {

  constructor(row, column, sound) {
    super(row, column);
    this.direction = 1;
    this.speedBob = IMAGE_SIZE;
    this.bobSound = sound;
    this.scoreBob = 0;
  }

  /**
   * Mueve a Spongebob hacia la derecha si es posible.
   */
  moveRight() {
    let newCol = this.coordXpixel + this.speedBob;
    if (newCol >= 0) {
      this.direction = 1;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Spongebob hacia la izquierda si es posible.
   */
  moveLeft() {
    let newCol = this.coordXpixel - this.speedBob;
    if (newCol >= 0) {
      this.direction = 3;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Spongebob hacia arriba si es posible.
   */
  moveUp() {
    let newRow = this.coordYpixel - this.speedBob;
    if (newRow >= 0) {
      this.direction = 4;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Mueve a Spongebob hacia abajo si es posible.
   */
  moveDown() {
    let newRow = this.coordYpixel + this.speedBob;
    if (newRow >= 0) {
      this.direction = 2;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Verifica si Spongebob colisiona con una roca.
   * Si la colisión ocurre, Spongebob vuelve a su posición inicial.
   *
   * @param {Object} roca - Objeto que representa la roca en el mapa.
   */
  testCollideRock(roca) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, roca.coordXpixel, roca.coordYpixel);
    if (distancia <  IMAGE_SIZE) {
      this.spawnBob();
    }
  }

  /**
   * Verifica si Spongebob recoge una comida.
   *
   * @param {Object} food - Objeto que representa la comida en el mapa.
   * @returns {boolean} `true` si Spongebob ha recogido la comida, `false` en caso contrario.
   */
  testCollideFood(food) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, food.coordXpixel, food.coordYpixel);
    return distancia < IMAGE_SIZE;
  }

  testCollideBar(bar){
    let distancia = dist(this.coordXpixel, this.coordYpixel, bar.coordXpixel, bar.coordYpixel);
    return distancia < IMAGE_SIZE;
  }

  /**
   * Restablece la posición de Spongebob a la inicial en el mapa.
   */
  spawnBob() {
    this.coordXpixel = 32;
    this.coordYpixel = 32;
  }
}
