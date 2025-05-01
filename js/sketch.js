import { Burger } from "./clases/Burger.js";
import { SpongeBob } from "./clases/SpongeBob.js";
import { Roca } from "./clases/Roca.js";
import { Bar } from "./clases/Bar.js";
import { ErrorBob } from "./clases/errorBob.js";
import { ConfigGameClass } from "./configGameClass.js";
const configGame = new ConfigGameClass();

//Variables

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
let menjarSound;
let key = 0;
let startTimeGame = 0;
let timer = 0;

//Arrays
const arrRocks = [];
const arrBurger = [];
const arrBar = [];

//Carregar imatges i so
function preload() {
  (imgRock = loadImage("../img/roca.png", handleImage, handleError)),
    (imgBurger = loadImage("../img/food.png", handleImage, handleError)),
    (imgBobUP = loadImage("../img/bobUP.png", handleImage, handleError)),
    (imgBobLEFT = loadImage("../img/bobLEFT.png", handleImage, handleError)),
    (imgBobRIGHT = loadImage("../img/bobRIGHT.png", handleImage, handleError)),
    (restaurant = loadImage("../img/bar.png", handleImage, handleError)),
    (BobSound = loadSound("../img/caminar.mp3", null, handleSoundError)),
    (menjarSound = loadSound("../img/menjar.mp3", null, handleSoundError));
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

//Funcio per iniciar el joc i crear el canvas
function setup() {
  if (gameStarted) {
    console.log("Setup ejecutado");
    createCanvas(configGame.widthCanvas, configGame.heightCanvas).parent("sketch-pacman");
    for (let filaActual = 0; filaActual < configGame.rows; filaActual++) {
      for (let columnActual = 0;columnActual < configGame.columns;columnActual++) {
        const mapa = configGame.map[filaActual][columnActual];
        if (mapa === 1) {
          const roca = new Roca(filaActual, columnActual, configGame);
          arrRocks.push(roca);
        } else if (mapa === 2) {
          const burger = new Burger(filaActual, columnActual, configGame);
          arrBurger.push(burger);
        } else if (mapa === 3) {
          myBob = new SpongeBob(filaActual, columnActual, BobSound, configGame);
        } else if (mapa === 4) {
          const bar = new Bar(filaActual, columnActual, configGame);
          arrBar.push(bar);
        } else if ( mapa !== 1 && mapa !== 2 && mapa !== 3 && mapa !== 4 && mapa !== 0) {
          let error = new ErrorBob(1, "Objecte no definit");
          error.showError();
        }
      }
    }
  }
  startTimeGame = millis();
}

//Funcio per dibuixar el joc i mostrar els objectes
function draw() {
  if (gameStarted) {
    console.log("Dibujando...");
    background(220);
    arrRocks.forEach((rock) => rock.showObject(imgRock));
    arrBurger.forEach((burger) => burger.showObject(imgBurger));
    arrBar.forEach((bar) => bar.showObject(restaurant));
    arrRocks.forEach((rock) => myBob.testCollideRock(rock));

    for (let i = arrBurger.length - 1; i >= 0; i--) {
      if (myBob.testCollideBurger(arrBurger[i])) {
        menjarSound.play();
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

    textSize(20);
    textAlign(CENTER, CENTER);
    timer = parseInt( millis() - startTimeGame);
    if (timer > configGame.maxTime) {
      FinishGame();
      return;
    }
    text(
      "Score: " + myBob.scoreBob,
      configGame.widthCanvas / 2,
      configGame.heightCanvas - 50
    );
    text(
      "Time: " + timer,
      configGame.widthCanvas / 2,
      configGame.heightCanvas - 20
    );

    switch (myBob.direction) {
      case 1: //Move right
        myBob.showObject(imgBobRIGHT);
        break;
      case 2: //Move up
        myBob.showObject(imgBobUP);
        break;
      case 3: //Move left
        myBob.showObject(imgBobLEFT);
        break;
      case 4: //Move down
        myBob.showObject(imgBobUP);
        break;
      default:
        myBob.showObject(imgBobUP);
    }
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

//Funcio per mostrar el missatge de final del joc i reiniciar el joc si es guanya o es perd
function FinishGame() {
  if (gameFinished) return;
  gameFinished = true;
  noLoop();

  const finalDiv = document.getElementById("final");
  const titol_message = document.getElementById("titol_message");
  const finalMessage = document.getElementById("final_message");

  let message;
  if (arrBurger.length === 0) {
    message = "Has guanyat el nivell!";
    if (configGame.level < 3) {
      configGame.loadLevel(configGame.level + 1);
      setTimeout(() => {
        resetGame();
        loop();
      }, 2000);
    } else {
      message = "🏆 Has completat tots els nivells!";
      setTimeout(() => {
        exitGame();
      }, 2000);
        

    }
  } else {
    message = "Has perdut";
    finalMessage.style.display = "none";
  }

  titol_message.textContent = message;
  finalDiv.style.display = "block";

  document.getElementById("exitBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

//Funcio per tancar el joc i tornar a la pagina principal
function exitGame()
{
  window.location.href = "../index.html";
}
//Funcio per reiniciar el joc i tornar a la pantalla inicial
function resetGame() {
  arrRocks.length = 0;
  arrBurger.length = 0;
  arrBar.length = 0;
  key = 0;
  gameFinished = false;
  document.getElementById("final").style.display = "none";
  setup();
}
// Funcio per iniciar el joc i amagar la pantalla inicial
function startGame() {
  console.log("Iniciando juego...");
  document.getElementById("info").style.display = "none";
  gameStarted = true;
  setup();
  loop();
}

globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed = keyPressed;
globalThis.startGame = startGame;
