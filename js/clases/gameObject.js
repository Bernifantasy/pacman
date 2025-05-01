/**
 * Classe base per a tots els objectes del joc posicionats en la graella.
 * Gestiona la posició (fila i columna), així com les coordenades en píxels.
 * 
 * Aquesta classe és pensada per ser estesa per altres elements del joc, com personatges o objectes.
 * 
 * @author Bernat Alvarez Borrell
 */
export class gameObject {
  /**
   * Crea una nova instància de gameObject.
   *
   * @param {number} row - Número de fila on es col·loca l'objecte dins la graella.
   * @param {number} col - Número de columna on es col·loca l'objecte dins la graella.
   * @param {object} config - Configuració global del joc, conté paràmetres com la mida de les imatges.
   */
  constructor(row, col, config) {
    /** @type {object} */
    this.config = config;

    /** @type {number} */
    this.rowNumber = row;

    /** @type {number} */
    this.columnNumber = col;

    /** @type {number} */
    this.coordYpixel = row * config.imageSize;

    /** @type {number} */
    this.coordXpixel = col * config.imageSize;
  }

  /**
   * Mostra l'objecte a la pantalla utilitzant una imatge.
   * Si les coordenades en píxels no estan definides, les calcula automàticament.
   *
   * @param {p5.Image} img - La imatge que es mostrarà per representar l'objecte.
   */
  showObject(img) {
    if (this.coordXpixel == null || this.coordYpixel == null) {
      this.coordXpixel = this.columnNumber * this.config.imageSize;
      this.coordYpixel = this.rowNumber * this.config.imageSize;
    }
    image(img, this.coordXpixel, this.coordYpixel, this.config.imageSize, this.config.imageSize);
  }
}
