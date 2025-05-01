/**
 * Classe que configura els paràmetres generals del joc segons el nivell seleccionat.
 * Conté dades com la mida de les imatges, dimensions del canvas, velocitat del jugador,
 * nombre de vides, temps màxim per nivell i el mapa corresponent.
 *
 * @author Bernat Alvarez
 */
export class ConfigGameClass {
  #level;
  #imageSize;
  #columns;
  #rows;
  #speedBob;
  #livesBob;
  #widthCanvas;
  #heightCanvas;
  #maxTime;
  #map;

  /**
   * Inicialitza la configuració amb el nivell 1 per defecte.
   */
  constructor() {
    this.#level = 1;
    this.loadLevel(this.#level);
  }

  /**
   * Carrega la configuració del nivell especificat.
   *
   * @param {number} level - El número de nivell (1, 2 o 3).
   */
  loadLevel(level) {
    this.#level = level;

    this.#imageSize = 32;
    this.#columns = 10;
    this.#rows = 15;
    this.#speedBob = 32;
    this.#livesBob = 3;
    this.#widthCanvas = this.columns * this.imageSize;
    this.#heightCanvas = this.rows * this.imageSize;

    this.#maxTime = level === 1 ? 60000 : level === 2 ? 45000 : 30000;

    this.#map = this.getMap(level);
  }

  /**
   * Retorna el mapa corresponent al nivell.
   *
   * @param {number} level - El nivell del joc.
   * @returns {number[][]} Una matriu que representa el mapa del joc.
   */
  getMap(level) {
    // [nivell 1, 2 i 3...]
  }

  /** @returns {number} Nivell actual del joc. */
  get level() {
    return this.#level;
  }

  /** @returns {number} Mida en píxels de cada imatge del joc. */
  get imageSize() {
    return this.#imageSize;
  }

  /** @returns {number} Nombre de columnes del tauler. */
  get columns() {
    return this.#columns;
  }

  /** @returns {number} Nombre de files del tauler. */
  get rows() {
    return this.#rows;
  }

  /** @returns {number} Velocitat del personatge principal. */
  get speedBob() {
    return this.#speedBob;
  }

  /** @returns {number} Nombre de vides del jugador. */
  get livesBob() {
    return this.#livesBob;
  }

  /** @returns {number} Amplada del canvas del joc. */
  get widthCanvas() {
    return this.#widthCanvas;
  }

  /** @returns {number} Alçada del canvas del joc. */
  get heightCanvas() {
    return this.#heightCanvas;
  }

  /** @returns {number} Temps màxim per completar el nivell (en mil·lisegons). */
  get maxTime() {
    return this.#maxTime;
  }

  /** @returns {number[][]} Matriu que representa el mapa del nivell. */
  get map() {
    return this.#map;
  }
}
