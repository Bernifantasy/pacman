import { gameObject } from "./gameObject.js";
import { IMAGE_SIZE, WIDTH_CANVAS, HEIGHT_CANVAS } from "../sketch.js";
import { map } from "../sketch.js";

/**
 * Clase Pacman.
 *
 * @extends gameObject
 * @author moi
 */
export class Pacman extends gameObject {
  /**
   * Crea una instancia de Pacman.
   *
   * @param {number} row - Fila donde se encuentra Pacman en el mapa.
   * @param {number} column - Columna donde se encuentra Pacman en el mapa.
   * @param {Audio} sound - Objeto de sonido que se reproducirá al moverse.
   */
  constructor(row, column, sound) {
    super(row, column);
    this.direction = 1;
    this.speedPacman = IMAGE_SIZE;
    this.pacSound = sound;
  }

  /**
   * Mueve a Pacman hacia la derecha si es posible.
   */
  moveRight() {
    let newCol = this.coordXpixel + this.speedPacman;
    if (newCol >= 0) {
      this.direction = 1;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Pacman hacia la izquierda si es posible.
   */
  moveLeft() {
    let newCol = this.coordXpixel - this.speedPacman;
    if (newCol >= 0) {
      this.direction = 3;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Pacman hacia arriba si es posible.
   */
  moveUp() {
    let newRow = this.coordYpixel - this.speedPacman;
    if (newRow >= 0) {
      this.direction = 4;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Mueve a Pacman hacia abajo si es posible.
   */
  moveDown() {
    let newRow = this.coordYpixel + this.speedPacman;
    if (newRow >= 0) {
      this.direction = 2;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Verifica si Pacman colisiona con una roca.
   * Si la colisión ocurre, Pacman vuelve a su posición inicial.
   *
   * @param {Object} roca - Objeto que representa la roca en el mapa.
   */
  testCollideRock(roca) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, roca.coordXpixel, roca.coordYpixel);
    if (distancia <  IMAGE_SIZE) {
      this.spawnPacman();
    }
  }

  /**
   * Verifica si Pacman recoge una comida.
   *
   * @param {Object} food - Objeto que representa la comida en el mapa.
   * @returns {boolean} `true` si Pacman ha recogido la comida, `false` en caso contrario.
   */
  testCollideFood(food) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, food.coordXpixel, food.coordYpixel);
    return distancia < IMAGE_SIZE;
  }

  /**
   * Restablece la posición de Pacman a la inicial en el mapa.
   */
  spawnPacman() {
    this.coordXpixel = 32;
    this.coordYpixel = 32;
  }
}
