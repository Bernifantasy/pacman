import { gameObject } from "./gameObject.js";

/**
 * Classe que representa el personatge de SpongeBob en el joc.
 * Extén `gameObject` i inclou funcionalitats per moure's, detectar col·lisions, gestionar puntuació i vides.
 *
 * @extends gameObject
 * @author Bernat Alvarez Borrell
 */
export class SpongeBob extends gameObject {
  /**
   * Crea una nova instància de SpongeBob.
   *
   * @param {number} row - Fila inicial on apareix SpongeBob.
   * @param {number} column - Columna inicial on apareix SpongeBob.
   * @param {p5.SoundFile} sound - So que es reprodueix quan SpongeBob es mou.
   * @param {object} config - Configuració global del joc, inclou la mida de la imatge, velocitat i vides.
   */
  constructor(row, column, sound, config) {
    super(row, column, config);

    /** @type {number} Direcció actual (1=dreta, 2=baix, 3=esquerra, 4=amunt) */
    this.direction = 1;

    /** @type {object} Configuració global */
    this.config = config;

    /** @type {number} Velocitat de moviment de SpongeBob */
    this.speedBob = config.speedBob;

    /** @type {p5.SoundFile} So que es reprodueix quan es mou */
    this.BobSound = sound;

    /** @type {number} Puntuació acumulada */
    this.scoreBob = 0;

    /** @type {number} Vides restants */
    this.BobLives = config.livesBob;
  }

  /**
   * Mou SpongeBob cap a la dreta i reprodueix un so.
   */
  moveRight() {
    let newCol = this.coordXpixel + this.speedBob;
    if (newCol >= 0) {
      this.direction = 1;
      this.coordXpixel = newCol;
    }
    this.BobSound.play();
  }

  /**
   * Mou SpongeBob cap a l'esquerra i reprodueix un so.
   */
  moveLeft() {
    let newCol = this.coordXpixel - this.speedBob;
    if (newCol >= 0) {
      this.direction = 3;
      this.coordXpixel = newCol;
    }
    this.BobSound.play();
  }

  /**
   * Mou SpongeBob cap amunt i reprodueix un so.
   */
  moveUp() {
    let newRow = this.coordYpixel - this.speedBob;
    if (newRow >= 0) {
      this.direction = 4;
      this.coordYpixel = newRow;
    }
    this.BobSound.play();
  }

  /**
   * Mou SpongeBob cap avall i reprodueix un so.
   */
  moveDown() {
    let newRow = this.coordYpixel + this.speedBob;
    if (newRow >= 0) {
      this.direction = 2;
      this.coordYpixel = newRow;
    }
    this.BobSound.play();
  }

  /**
   * Comprova si SpongeBob ha col·lisionat amb una roca.
   * Si hi ha col·lisió, perd una vida i torna a la posició inicial.
   *
   * @param {gameObject} roca - Objecte amb el qual es comprova la col·lisió.
   */
  testCollideRock(roca) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, roca.coordXpixel, roca.coordYpixel);
    if (distancia < this.config.imageSize) {
      this.BobLives--;
      this.spawnBob();
    }
  }

  /**
   * Comprova si SpongeBob ha col·lisionat amb una hamburguesa.
   *
   * @param {gameObject} food - Hamburguesa per comprovar col·lisió.
   * @returns {boolean} Cert si hi ha col·lisió.
   */
  testCollideBurger(food) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, food.coordXpixel, food.coordYpixel);
    return distancia < this.config.imageSize;
  }

  /**
   * Comprova si SpongeBob ha col·lisionat amb el restaurant (Bar).
   *
   * @param {gameObject} bar - Bar per comprovar col·lisió.
   * @returns {boolean} Cert si hi ha col·lisió.
   */
  testCollideBar(bar) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, bar.coordXpixel, bar.coordYpixel);
    return distancia < this.config.imageSize;
  }

  /**
   * Torna SpongeBob a la seva posició inicial a la graella.
   */
  spawnBob() {
    this.coordXpixel = 32;
    this.coordYpixel = 32;
  }
}
