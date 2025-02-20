/**
 * Clase base para todos los objetos del juego.
 * Define la posición en la cuadrícula y en píxeles.
 *
 * @author moi
 */
import {configGame} from "../configGame.js";


export class gameObject{
  /**
   * Crea una instancia de gameObject.
   *
   * @param {number} row - Número de fila en la cuadrícula.
   * @param {number} col - Número de columna en la cuadrícula.
   */

  constructor(row,col)
  {
    this.rowNumber = row;
    this.columnNumber = col;
    this.coordYpixel= row * configGame.IMAGE_SIZE;
    this.coordXpixel= col * configGame.IMAGE_SIZE;

  }

  /**
   * Muestra el objeto en la pantalla con la imagen proporcionada.
   *
   * @param {p5.Image} img - Imagen del objeto a renderizar.
   */


  showObject(img){
    if(this.coordXpixel == null || this.coordYpixel == null ){
      this.coordXpixel = this.rowNumber * IMAGE_SIZE;
      this.coordYpixel = this.columnNumber * IMAGE_SIZE;
    }
    image(img, this.coordXpixel, this.coordYpixel);
  }

}

