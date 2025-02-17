import {gameObject} from "./gameObject.js";

/**
 * Clase que representa la comida en el juego.
 * Extiende `gameObject` y define el valor en puntos de la comida.
 *
 * @extends gameObject
 * @author moi
 */

export class Food extends gameObject{
  /**
   * Crea una instancia de Food.
   *
   * @param {number} row - La fila donde se coloca la comida en la cuadrícula.
   * @param {number} column - La columna donde se coloca la comida en la cuadrícula.
   */
  constructor(row,column) {
    super(row,column);
    this.pointsfood = 10;
  }
}
