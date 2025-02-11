import {gameObject} from "./clases/gameObject.js";
import {Pacman} from "./clases/Pacman.js";



export const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,2,2,2,2,1,1,1,2,2,2,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,2,1,0,0,0,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,2,2,2,3,2,2,2,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,2,2,2,2,2,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,2,2,2,2,2,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,2,1,1,1,2,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,2,2,2,2,2,2,1,1,1,2,2,2,2,1],
  [1,2,2,1,1,1,2,1,1,1,2,1,2,1,2,2,2,2,1,2,1],
  [1,2,2,2,2,1,2,2,1,2,2,1,2,2,2,2,2,2,1,2,1],
  [1,2,2,2,2,1,2,2,1,2,1,1,1,1,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];
const ROWS = 21;
const COLUMNS = 21;
export const IMAGE_SIZE = 32;
export const WIDTH_CANVAS = ROWS * IMAGE_SIZE;
export const HEIGHT_CANVAS = COLUMNS * IMAGE_SIZE;

let imgRock;
let imgFood;
let imgPacRight;
let imgPacLeft;
let imgPacUp;
let imgPacDown;
let myPacman;

const arrRocks = [];
const arrFood = [];
const numberImagesLoaded = 0;

function preload() {
  imgRock = loadImage("../img/roca.png", handleImage, handleError);
  imgFood = loadImage("../img/food.png", handleImage, handleError);
  imgPacRight = loadImage("../img/pacRight.png", handleImage, handleError);
  imgPacLeft = loadImage("../img/pacLeft.png", handleImage, handleError);
  imgPacDown = loadImage("../img/pacDown.png", handleImage, handleError);
  imgPacUp = loadImage("../img/pacUp.png", handleImage, handleError);
}

function handleError() {
  console.error("Error carregar imatge");
}

function handleImage() {
  console.error("Images carregada correctament");
}

function setup() {
  createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS).parent("sketch-pacman");
  for (let filaActual = 0; filaActual < ROWS; filaActual++) {
    for (let columnActual = 0; columnActual < COLUMNS; columnActual++) {
      if (map[filaActual][columnActual] === 1) {
        const roca = new gameObject(filaActual, columnActual);
        arrRocks.push(roca);
      } else if (map[filaActual][columnActual] === 2) {
        const food = new gameObject(filaActual, columnActual);
        arrFood.push(food);
      }else if(map[filaActual][columnActual] === 3) {
        myPacman = new Pacman(filaActual, columnActual);
      }
    }
  }
}

function draw() {
  background(171, 248, 168);
  arrRocks.forEach((roca) => roca.showObject(imgRock));
  arrFood.forEach((food) => food.showObject(imgFood));
  if(myPacman.direction===1){
    myPacman.showObject(imgPacRight);
  }else if(myPacman.direction===2) {
    myPacman.showObject(imgPacDown);
  }else if(myPacman.direction===3){
    myPacman.showObject(imgPacLeft);
  }else if(myPacman.direction===4){
    myPacman.showObject(imgPacUp);
  }


}

function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    myPacman.moveRight();
  }else if(keyCode === LEFT_ARROW) {
    myPacman.moveLeft();
  }else if(keyCode === UP_ARROW) {
    myPacman.moveUp();
  }else if(keyCode === DOWN_ARROW) {
    myPacman.moveDown();
  }
}

globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed= keyPressed;
