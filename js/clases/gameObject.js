import {IMAGE_SIZE} from "../sketch.js";

export class gameObject{

  constructor(row,col)
  {
    this.rowNumber = row;
    this.columnNumber = col;
    this.coordYpixel= row * IMAGE_SIZE;
    this.coordXpixel= col * IMAGE_SIZE;
  }

  showObject(img){
    if(this.coordXpixel == null || this.coordYpixel == null ){
      this.coordXpixel = this.rowNumber * IMAGE_SIZE;
      this.coordYpixel = this.columnNumber * IMAGE_SIZE;
    }
    image(img, this.coordXpixel, this.coordYpixel);
  }

}

