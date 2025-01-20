const music = new Audio('audio/homemusic.mp3');
music.volume = 1;
music.loop = true;
music.play();



function tor() {
  window.location.href = 'insex.html';
}
function toa() {
  window.location.href = 'Aiplay.html';
}
let gameindex = null;
window.addEventListener("gamepadconnected", (event) => {
  gameindex = event.gamepad.index;


});

window.addEventListener("gamepaddisconnected", (event) => {

  gameindex = null;
});
let flagg = false;
let buttonPressed = false;
const div = document.querySelector(".container");
function controlerinput3() {

  if (gameindex != null) {
    const gamepad3 = navigator.getGamepads()[gameindex];

    const buttons3 = gamepad3.buttons;
    clickpress = buttons3[2].pressed;


    if (clickpress && isclasshover(buttonAi)) {
      toa()
    }
    if (clickpress && isclasshover(buttonreg)) {
      tor()
    }

    if (buttons3[1].pressed && !buttonPressed) {
      buttonPressed = true;
      if (!flagg) {
        div.style.display = 'block';
        flagg = true;
      } else {
        div.style.display = 'none';
        flagg = false;
      }


      setTimeout(() => {
        buttonPressed = false;
      }, 200);
    } else if (!buttons3[1].pressed) {

      buttonPressed = false;
    }





  }

}
window.toolbar = false;

const buttons = document.querySelectorAll('button');
function checkButtonHover() {
  buttons.forEach(button => {
    const buttonRect = button.getBoundingClientRect();
    const withinHorizontalBounds = cursorX > buttonRect.left && cursorX < buttonRect.right;
    const withinVerticalBounds = cursorY > buttonRect.top && cursorY < buttonRect.bottom;

    if (withinHorizontalBounds && withinVerticalBounds) {
      button.classList.add('hover');
    } else {
      button.classList.remove('hover');
    }
  });
}
const buttonAi = document.getElementById('toai');
const buttonreg = document.getElementById('toreg');
function isclasshover(but) {
  return but.classList.contains('hover');

}
const cursorElement = document.getElementById('cursor');
cursorElement.style.backgroundImage = "url('./img/cusor2.png')";
cursorElement.style.width = "100px";
cursorElement.style.height = "100px";
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;


function gameLoop() {
  music.play();
  const gamepads = navigator.getGamepads();



  if (gamepads[0]) {
    const gamepad = gamepads[0];


    const upPressed = gamepad.buttons[12].pressed;
    const downPressed = gamepad.buttons[13].pressed;
    const leftPressed = gamepad.buttons[14].pressed;
    const rightPressed = gamepad.buttons[15].pressed;

    const stepSize = 5;

    if (upPressed) {
      cursorY -= stepSize;
    }
    if (downPressed) {
      cursorY += stepSize;
    }
    if (leftPressed) {
      cursorX -= stepSize;
    }
    if (rightPressed) {
      cursorX += stepSize;
    }


    cursorX = Math.max(0, Math.min(cursorX, window.innerWidth));
    cursorY = Math.max(0, Math.min(cursorY, window.innerHeight));

    cursorElement.style.left = cursorX + 'px';
    cursorElement.style.top = cursorY + 'px';
  }
  checkButtonHover();


  controlerinput3();
  requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
