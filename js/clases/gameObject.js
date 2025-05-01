
export class gameObject {
  constructor(row, col, config) {

    this.config = config;
    this.rowNumber = row;
    this.columnNumber = col;
    this.coordYpixel = row * config.imageSize;
    this.coordXpixel = col * config.imageSize;
  }

  showObject(img) {
    if (this.coordXpixel == null || this.coordYpixel == null) {
      this.coordXpixel = this.columnNumber * this.config.imageSize;
      this.coordYpixel = this.rowNumber * this.config.imageSize;
    }
    image(img, this.coordXpixel, this.coordYpixel,this.config.imageSize,this.config.imageSize);
  }
}
