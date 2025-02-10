import {gameObject} from "./gameObject.js";

export class Food extends gameObject{
  constructor(row,column) {
    super(row,column);
    this.pointsfood = 10;
  }
}
