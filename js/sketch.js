import {gameObject} from "./clases/gameObject.js";
import {Food} from "./clases/Food.js";
import {SpongeBob} from "./clases/SpongeBob.js";

let gameStarted = false;

/*
export const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 1, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
*/
export const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 4, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const ROWS = 10;
const COLUMNS = 10;
export const IMAGE_SIZE = 32;
export const WIDTH_CANVAS = COLUMNS * IMAGE_SIZE;
export const HEIGHT_CANVAS = ROWS * IMAGE_SIZE;

let imgRock;
let imgFood;
let imgBobUP;
let imgBobRIGHT;
let imgBobDOWN;
let imgBobLEFT;
let restaurant;
let myBob;
let pacSound;
let key=0;

const arrRocks = [];
const arrFood = [];
const arrBar = [];
const numberImagesLoaded = 0;

function preload() {
  imgRock = loadImage("../img/roca.png", handleImage, handleError);
  imgFood = loadImage("../img/food.png", handleImage, handleError);
  imgBobUP = loadImage("../img/bobUP.png", handleImage, handleError);
  imgBobLEFT = loadImage("../img/bobLEFT.png", handleImage, handleError);
  imgBobRIGHT = loadImage("../img/bobRIGHT.png", handleImage, handleError);
  imgBobDOWN = loadImage("../img/bobDOWN.png", handleImage, handleError);
  restaurant = loadImage("../img/bar.png", handleImage, handleError);
  pacSound = loadSound("../img/move.mp3");
}

function handleError() {
  console.error("Error carregar imatge");
}

function handleImage() {
  console.error("Images carregada correctament");
}

function setup() {
  if (gameStarted) {
    createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS).parent("sketch-pacman");
    for (let filaActual = 0; filaActual < ROWS; filaActual++) {
      for (let columnActual = 0; columnActual < COLUMNS; columnActual++) {
        if (map[filaActual][columnActual] === 1) {
          const roca = new gameObject(filaActual, columnActual);
          arrRocks.push(roca);
        } else if (map[filaActual][columnActual] === 2) {
          const food = new Food(filaActual, columnActual);
          arrFood.push(food);
        } else if (map[filaActual][columnActual] === 3) {
          myBob = new SpongeBob(filaActual, columnActual, pacSound);
        } else if (map[filaActual][columnActual] === 4) {
          const bar = new gameObject(filaActual, columnActual);
          arrBar.push(bar);
        }
      }
    }
  }
}

function draw() {
  if (gameStarted) {
    background(171, 248, 168);
    arrRocks.forEach(rock => rock.showObject(imgRock));
    arrFood.forEach(food => food.showObject(imgFood));
    arrBar.forEach(bar => bar.showObject(restaurant));
    arrRocks.forEach(rock => myBob.testCollideRock(rock));

    for (let i = arrFood.length - 1; i >= 0; i--) {
      if (myBob.testCollideFood(arrFood[i])) {
        arrFood.splice(i, 1);
        key = 1;
      }
    }

    for (let i = arrBar.length - 1; i >= 0; i--) {
      if (myBob.testCollideBar(arrBar[i]) && key === 1) {
        arrBar.splice(i, 1);
        setTimeout(FinishGame, 200);
      } else if (myBob.testCollideBar(arrBar[i]) && key === 0) {
        setTimeout(FinishGame, 50);
      }
    }

    switch (myBob.direction) {
      case 1: //Move right
        myBob.showObject(imgBobRIGHT);
        break;
      case 2: //Move up
        myBob.showObject(imgBobDOWN);
        break;
      case 3: //Move left
        myBob.showObject(imgBobLEFT);
        break
      case 4: //Move down
        myBob.showObject(imgBobUP);
        break;
      default :
        myBob.showObject(imgBobUP);
    }

  }
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    myBob.moveRight();
  }else if(keyCode === LEFT_ARROW) {
    myBob.moveLeft();
  }else if(keyCode === UP_ARROW) {
    myBob.moveUp();
  }else if(keyCode === DOWN_ARROW) {
    myBob.moveDown();
  }
}

function FinishGame() {
  noLoop();

  let message = arrFood.length === 0 ? "Has guanyat. Desitja jugar una altra partida?" : "Has perdut. Desitja jugar una altra partida?";

  if (confirm(message)) {
    restartGame();
  } else {
    alert("Gràcies per jugar");
  }
}


function restartGame() {

  arrRocks.length = 0;
  arrFood.length = 0;

  setup();

  loop();


}
function startGame() {
  gameStarted = true;
  loop();
  setup();
}


globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed= keyPressed;
globalThis.startGame = startGame;
