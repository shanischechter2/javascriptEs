const canvas = document.querySelector('canvas');
canvas.style.width = '100%';

canvas.style.height = '100%';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');



c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.8;

const backround = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: './img/back2.jpg',
    canvas: canvas,
    scal: 1.02
})

const shop = new Sprite({
    position: {
        x: 50,
        y: 230
    },
    imgSrc: './img/shop.png',
    scal: 2.5,
    framax: 6,
    canvas: canvas,
    framhold: 8
})


const player = new Fighter({
    position: {
        x: 700,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0
    },
    imgSrc: './img/m90.png',
    framax: 3,
    framhold: 10,
    scal: 0.5,
    canvas: canvas,
    offset: {
        x: 100,
        y: 100
    },
    sprites: {
        stand: {
            imgSrc: './img/m90.png',
            framax: 3


        },
        run: {
            imgSrc: './img/mayar.png',
            framax: 6
        },
        runback: {
            imgSrc: './img/mayarback.png',
            framax: 6
        },
        jump: {
            imgSrc: './img/mj2.png',
            framax: 2
        },
        attak1: {
            imgSrc: './img/msy7.png',
            framax: 7,
            framhold: 5
        }
    }

});


const enemy = new Fighter({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imgSrc: './img/yotamstand1.png',
    framax: 7,
    framhold: 13,
    canvas: canvas,
    scal: 0.5,
    offset: {
        x: 100,
        y: 100
    },
    sprites: {
        stand: {
            imgSrc: './img/yotamstand1.png',
            framax: 7
        },
        standback: {
            imgSrc: './img/yotamstand1back.png',
            framax: 7
        },
        run: {
            imgSrc: './img/yrun.png',
            framax: 4
        },
        runback: {
            imgSrc: './img/yrunback.png',
            framax: 4
        },
        jump: {
            imgSrc: './img/yotamjump2.png',
            framax: 2
        },
        attak1: {
            imgSrc: './img/yotamaccak2.png',
            framax: 7,
            framhold: 5
        },
        dameg: {
            imgSrc: './img/yotamaret1.png',
            framax: 7,
            framhold: 2
        }
    }

});
const keys = {
    leftkey: {
        prass: false
    },
    rightkey: {
        prass: false
    },
    enemyleft: {
        prass: false
    },
    enemyright: {
        prass: false
    }

}


let flag = false;
let gamecontrolindex = null;
let leftpress = false;
let rightpress = false;
let uppress = false;

let downpress = false;

let attackmaya = false;

function isover({ r1, r2 }) {
    return (
        r1.attacbax.position.x + r1.attacbax.width >= r2.attacbax.position.x &&
        r1.attacbax.position.x <= r2.attacbax.position.x + r2.attacbax.width &&
        r1.attacbax.position.y + r1.attacbax.height >= r2.attacbax.position.y &&
        r1.attacbax.position.y <= r2.attacbax.position.y + r2.attacbax.height
    );
}

const div = document.querySelector('#countwins');

function updateWins() {

    div.innerHTML = `${enemy.wins} :  ${player.wins} `;

}


window.addEventListener("gamepadconnected", (event) => {
    gamecontrolindex = event.gamepad.index;

});

window.addEventListener("gamepaddisconnected", (event) => {

    gamecontrolindex = null;
});
function controlerinput() {
    if (gamecontrolindex != null) {
        const gamepad = navigator.getGamepads()[gamecontrolindex];

        const buttons = gamepad.buttons;
        uppress = buttons[0].pressed;
        downpress = buttons[13].pressed;
        rightpress = buttons[14].pressed;
        leftpress = buttons[15].pressed;
        attackmaya = buttons[7].pressed;

        const stickdeadzone = 0.4;
        const leftrigthValue = gamepad.axes[0];

        if (leftrigthValue >= stickdeadzone) {
            leftpress = true;
        } else if (leftrigthValue <= -stickdeadzone) {
            rightpress = true;
        }


        if (attackmaya && player.canAttack) {
            player.attack();
            player.canAttack = false; 
        }


        if (!attackmaya) {
            player.canAttack = true; 
        }

        if (buttons[8].pressed) {
            window.location.href = 'homepage.html';
        }


    }
    moveplayer()
}

const musicjump2 = new Audio('audio/jumpmusic.wav');
musicjump2.volume = 1;
function moveplayer() {

    if (rightpress) {
        player.velocity.x = -5
        player.switchSptite('run');
    } else if (leftpress) {
        player.velocity.x = 5

        player.switchSptite('runback');
    }
    else {

        player.switchSptite('stand');

    }

    if (player.velocity.y < 0 || player.velocity.y > 0) {

        player.switchSptite('jump');

    }


    if (uppress) {
        player.velocity.y = -10;
        musicjump2.play();
    }



}


function anameit() {

    window.requestAnimationFrame(anameit);



    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    backround.update();

    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    controlerinput();

    //enemy



    if (keys.enemyleft.prass && enemy.lastkey === 'l') {
        enemy.velocity.x = -5
        enemy.switchSptite('runback');

    } else if (keys.enemyright.prass && enemy.lastkey === 'r') {
        enemy.velocity.x = 5
        enemy.switchSptite('run');

    } else {
        enemy.switchSptite('stand');
    }

    if (enemy.velocity.y < 0 || enemy.velocity.y > 0) {
        enemy.switchSptite('jump');
    }

    updateWins();


    
    if (player.position.x >= shop.position.x &&
        player.position.x <= shop.position.x + shop.width) {
        if (player.position.y >= shop.position.y &&
            player.position.y <= shop.position.y + shop.height) {
            if (backround.getimgSrc() === './img/back2.jpg') {
                movetonew();
         
            }
        }
        else if (player.position.y <= shop.position.y &&
            player.position.y >= shop.position.y - shop.height) {

            movetoold();
        
        }

    }


    if (isover({ r1: player, r2: enemy }) && player.isAtccing) {
        player.isAtccing = false;
        enemy.heart -= 10;
        document.querySelector('#playerlife').style.width = enemy.heart + '%';
    

    }
    if (isover({ r1: enemy, r2: player }) && enemy.isAtccing) {
        enemy.isAtccing = false;
        player.heart -= 10;
        document.querySelector('#enemylife').style.width = player.heart + '%';

    }

    if (enemy.heart <= 0 && !flag && (player.wins < 3 && enemy.wins < 3)) {
        player.wins++;
        flag = true;
        gamereset()

    } else if (player.heart <= 0 && !flag && (player.wins < 3 && enemy.wins < 3)) {
        enemy.wins++;
        flag = true;
        gamereset()
    }
    if (player.wins === 3) {
        setTimeout(() => {
            gameoveryotam();
        }, 1000);
        notyam();
    }
    if (enemy.wins === 3) {
        setTimeout(() => {
            gameover();
        }, 1000);

        notmaya();

    }



}
anameit();
function gamereset() {
    document.querySelector('#playerlife').style.width = 100 + '%';
    document.querySelector('#enemylife').style.width = 100 + '%';
    player.heart = 100;
    enemy.heart = 100;
    player.position = {
        x: 700,
        y: 0
    }

    enemy.position = {
        x: 200,
        y: 0
    }
    flag = false;


}
function gameover() {

    const imgyotam2 = document.createElement('img');
    imgyotam2.src = './img/mayaRIP.png';
    imgyotam2.style.position = 'absolute';
    imgyotam2.style.top = `${canvas.offsetTop}px`;
    imgyotam2.style.left = `${canvas.offsetLeft}px`;
    imgyotam2.style.width = `${canvas.width}px`;
    imgyotam2.style.height = `${canvas.height}px`;
    imgyotam2.style.display = 'none';

    document.body.appendChild(imgyotam2);
    imgyotam2.style.display = 'block';




}
function gameoveryotam() {
    const gifImg = document.createElement('img');
    gifImg.src = './img/zikokim1.gif';
    gifImg.style.position = 'absolute';
    gifImg.style.top = `${canvas.offsetTop}px`;
    gifImg.style.left = `${canvas.offsetLeft}px`;
    gifImg.style.width = `${canvas.width}px`;
    gifImg.style.height = `${canvas.height}px`;
    gifImg.style.display = 'none';

    document.body.appendChild(gifImg);


    const imgyotam = document.createElement('img');
    imgyotam.src = './img/yotamrip.png';
    imgyotam.style.position = 'absolute';
    imgyotam.style.width = `500px`;
    imgyotam.style.height = `500px`;
    imgyotam.style.display = 'none';

    document.body.appendChild(imgyotam);


    function centerImgYotam() {
        const gifRect = gifImg.getBoundingClientRect();
        const yotamWidth = imgyotam.offsetWidth;
        const yotamHeight = imgyotam.offsetHeight;

        imgyotam.style.top = `${gifRect.top + (gifRect.height / 2) - (yotamHeight / 2)}px`;
        imgyotam.style.left = `${gifRect.left + (gifRect.width / 2) - (yotamWidth / 2)}px`;
    }


    gifImg.style.display = 'block';
    imgyotam.style.display = 'block';

    centerImgYotam();


    canvas.style.display = 'none';


}
function notyam() {
    gifImg.style.display = 'none';
    imgyotam.style.display = 'none';




    canvas.style.display = 'block';
}
function notmaya() {
    imgyotam2.style.display = 'none';




    canvas.style.display = 'block';
}
function movetonew() {

    backround.setimgSrc('./img/b80.png');
    backround.position.y = 0;
    backround.position.x = 0;

    player.position.x = 700;
    enemy.position.x = 200;

    player.position.y = 0;
    enemy.position.y = 0;

    player.offset.x = 0;
    enemy.offset.x = 0

    player.offset.y = 20
    enemy.offset.y = 10

    player.scal = 0.6
    enemy.scal = 0.6
    backround.scal = 1;


    shop.position.x = 1050
    shop.position.y = 420



}
function movetoold() {

    backround.setimgSrc('./img/back2.jpg');
    backround.position.y = 0;
    backround.position.x = 0;

    player.position.x = 700;
    enemy.position.x = 200;

    player.position.y = 0;
    enemy.position.y = 0;

    player.offset.x = 0;
    enemy.offset.x = 0

    player.offset.y = 80
    enemy.offset.y = 70

    player.scal = 0.5
    enemy.scal = 0.5
    backround.scal = 1.02;


    shop.position.x = 50
    shop.position.y = 230



}






window.addEventListener('keydown', function (e) {

    switch (e.key) {

        //enemy
        case "w":
        case "W":
            enemy.velocity.y = -10;
            break;

        case "a":
        case "A":
            keys.enemyleft.prass = true;
            enemy.lastkey = 'l'
            break;
        case "d":
        case "D":
            keys.enemyright.prass = true;
            enemy.lastkey = 'r'
            break;
        case 's':
        case "S":
            enemy.velocity.y = -22
       
            break;
        case 'q':
        case "Q":

            if (enemy.canAttack) {
                enemy.attack();
                enemy.canAttack = false;
            }


            break;


    }
})

window.addEventListener("keyup", function (e) {
    switch (e.key) {

        case "ArrowLeft":
            keys.leftkey.prass = false;
            break;
        case "ArrowRight":
            keys.rightkey.prass = false;
            break;

        case 'a':
        case "A":
            keys.enemyleft.prass = false;
            break;

        case 'd':
        case "D":
            keys.enemyright.prass = false;
            break;


        case 'q':
        case "Q":
            enemy.canAttack = true;
            break;

    }




})







