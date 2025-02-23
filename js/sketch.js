import {Burger} from "./clases/Burger.js";
import {SpongeBob} from "./clases/SpongeBob.js";
import {Roca} from "./clases/Roca.js";
import {Bar} from "./clases/Bar.js";
import {ErrorBob} from "./clases/errorBob.js";
import {configGame} from "./configGame.js";

let gameStarted = false;
let gameFinished = false;


let imgRock;
let imgBurger;
let imgBobUP;
let imgBobRIGHT;
let imgBobLEFT;
let restaurant;
let myBob;
let BobSound;
let key=0;
let startTimeGame=0;
let timer=0;

const arrRocks = [];
const arrBurger = [];
const arrBar = [];

function preload() {
  imgRock = loadImage("../img/roca.png", handleImage, handleError);
  imgBurger = loadImage("../img/food.png", handleImage, handleError);
  imgBobUP = loadImage("../img/bobUP.png", handleImage, handleError);
  imgBobLEFT = loadImage("../img/bobLEFT.png", handleImage, handleError);
  imgBobRIGHT = loadImage("../img/bobRIGHT.png", handleImage, handleError);
  restaurant = loadImage("../img/bar.png", handleImage, handleError);
  BobSound = loadSound("../img/move.mp3", null, handleSoundError);
}

function handleError() {
  let error = new ErrorBob(10, "Imatge no carregada");
  error.showError();

}

function handleImage() {
  //No fico res, per no mostrar coses a la consola, per a que el public no ho vegi.

}

function handleSoundError() {
  let error = new ErrorBob(10, "So no carregat");
  error.showError();
}

function setup() {
  if (gameStarted) {
    createCanvas(configGame.WIDTH_CANVAS, configGame.HEIGHT_CANVAS).parent("sketch-pacman");
    for (let filaActual = 0; filaActual < configGame.ROWS; filaActual++) {
      for (let columnActual = 0; columnActual < configGame.COLUMNS; columnActual++) {
        let mapa = configGame.map[filaActual][columnActual];
        if (mapa === 1) {
          const roca = new Roca(filaActual, columnActual);
          arrRocks.push(roca);
        } else if (mapa=== 2) {
          const burger = new Burger(filaActual, columnActual);
          arrBurger.push(burger);
        } else if (mapa === 3) {
          myBob = new SpongeBob(filaActual, columnActual, BobSound);
        } else if (mapa === 4) {
          const bar = new Bar(filaActual, columnActual);
          arrBar.push(bar);
        }else if (mapa !== 1 && mapa !== 2 && mapa !== 3 && mapa !== 4 && mapa !== 0) {
          let error = new ErrorBob(1, "Objecte no definit");
          error.showError();
        }
      }
    }
    startTimeGame = millis();
  }

}

function draw() {

  if (gameStarted) {
    background(171, 248, 168);
    arrRocks.forEach(rock => rock.showObject(imgRock));
    arrBurger.forEach(burger => burger.showObject(imgBurger));
    arrBar.forEach(bar => bar.showObject(restaurant));
    arrRocks.forEach(rock => myBob.testCollideRock(rock));

    for (let i = arrBurger.length - 1; i >= 0; i--) {
      if (myBob.testCollideBurger(arrBurger[i])) {
        arrBurger.splice(i, 1);
        key = 1;
        myBob.scoreBob = myBob.scoreBob + 10;
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
        myBob.showObject(imgBobUP);
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

    
    textSize(20);
    textAlign(CENTER, CENTER);
    timer = parseInt( millis() - startTimeGame);
    text("Score: " + myBob.scoreBob, 150, configGame.HEIGHT_CANVAS + 50);


  }
}

function keyPressed() {
  if (gameStarted) {
    if (keyCode === RIGHT_ARROW) {
      myBob.moveRight();
    } else if (keyCode === LEFT_ARROW) {
      myBob.moveLeft();
    } else if (keyCode === UP_ARROW) {
      myBob.moveUp();
    } else if (keyCode === DOWN_ARROW) {
      myBob.moveDown();
    } else {
      let error = new ErrorBob(11, "Tecla no valida");
      error.showError();
    }
  }
}

function FinishGame() {
  if(gameFinished) return;
  gameFinished = true;
  noLoop();

  const finalDiv = document.getElementById("final");
  const finalMessage = document.getElementById("final_message");

  let message = arrBurger.length === 0 ? "Has guanyat. Desitja jugar una altra partida?" : "Has perdut. Desitja jugar una altra partida?";

  finalMessage.textContent = message;
  finalDiv.style.display = "block";

  document.getElementById("restartBtn").addEventListener("click", restartGame);
  document.getElementById("exitBtn").addEventListener("click", () => {window.location.href = "../index.html";});
}


function restartGame() {
  gameFinished = false;
  arrRocks.length = 0;
  arrBurger.length = 0;
  arrBar.length = 0;
  startGame();
  document.getElementById("final").style.display = "none";
}
function startGame() {
  gameStarted = true;
  document.getElementById("info").style.display = "none";
  setup();
  loop();
}


globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed= keyPressed;
globalThis.startGame = startGame;
