const canvas2= document.querySelector('canvas');
canvas2.style.width = '100%';

canvas2.style.height = '100%';
canvas2.width = window.innerWidth;  
canvas2.height = window.innerHeight; 
const c2=canvas2.getContext('2d');

c2.fillRect(0,0,canvas2.width,canvas2.height);
const gravity=0.8;

const backround2= new Sprite({
    position: {
        x:0,
        y:0
    },
    imgSrc: './img/back2.jpg',
    canvas: canvas2,
    scal:1.02

})
const shop2= new Sprite({
    position: {
        x:50,
        y:230
    },
    imgSrc: './img/shop.png',
    scal: 2.5,
    framax:6,
    canvas: canvas2,
    framhold:8
})


const player2=new Fighter({
    position:{
    x:700,
    y:260
    },
    velocity:{
        x:0,
        y:0
    },
    color: 'red',
    offset:{
        x:0,
        y:0
     },
     imgSrc: './img/m90.png',
     framax:3,
     canvas: canvas2,
     framhold:10,
     scal:0.5,
     offset:{
        x:100,
        y:100
     },
     sprites:{
        stand:{
            imgSrc: './img/m90.png',
            framax:3
        

        },
        run:{
            imgSrc: './img/mayar.png',
            framax: 6
        },
           runback:{
            imgSrc: './img/mayarback.png',
            framax: 6
        },
        jump:{
            imgSrc: './img/mj2.png',
            framax: 2
        },
        attak1:{
            imgSrc: './img/msy7.png',
            framax: 7,
           framhold:5
        }
     },
     canvas: canvas2

});


const enemy2=new Fighter({
    position:{
        x:200,
        y:260
        },
        velocity:{
            x:0,
            y:0
        },
     
        // offset:{
        //    x:50,
        //    y:0
        //  },
        imgSrc: './img/yotamstand1.png',
        framax:7,
        framhold:13,
        canvas: canvas2,
        scal:0.5,
        offset:{
           x:100,
           y:100
        },
        sprites:{
           stand:{
               imgSrc: './img/yotamstand1.png',
               framax:7
           
   
           },
           run:{
            imgSrc: './img/yrun.png',
            framax: 4
           },
           jump:{
               imgSrc: './img/yotamjump2.png',
               framax: 2
           },
           attak1:{
               imgSrc: './img/yotamaccak2.png',
               framax: 7,
              framhold:5
           },
           dameg:{
            imgSrc: './img/yotamaret1.png',
            framax: 7,
           framhold:2
        }
         }

});
const keys2={
    leftkey:{
        prass: false
    },
    rightkey:{
        prass: false
    },
    enemyleft:{
        prass: false
    },
    enemyright:{
        prass: false
    }
    
}

let k2;
let flag2=false;

function isover2({r1,r2})
{
    return (
        r1.attacbax.position.x + r1.attacbax.width >= r2.attacbax.position.x &&
        r1.attacbax.position.x <= r2.attacbax.position.x + r2.attacbax.width &&
        r1.attacbax.position.y + r1.attacbax.height >= r2.attacbax.position.y &&
        r1.attacbax.position.y <= r2.attacbax.position.y + r2.attacbax.height
    );
}
let y2=true;
const div2 = document.querySelector('#countwins2');

   function updateWins2() {
   
    div2.innerHTML = `${enemy2.wins} :  ${player2.wins} `;

  }
  let gamecontrolindex2=null;
let leftpress2=false;
let rightpress2=false;
let uppress2=false;

let downpress2=false;

let attackmaya2=false;
  window.addEventListener("gamepadconnected", (event) => {
    gamecontrolindex2 = event.gamepad.index;
    console.log("connected");
   
  });
  
  window.addEventListener("gamepaddisconnected", (event) => {
    console.log("disconnected");
    gamecontrolindex2 = null;
  });
  function controlerinput()
  {
    if(gamecontrolindex2!=null){
        const gamepad2=navigator.getGamepads()[gamecontrolindex2];
      
         const buttons2=gamepad2.buttons;
         uppress2=buttons2[0].pressed;
         downpress2=buttons2[13].pressed;
         rightpress2=buttons2[14].pressed;
         leftpress2=buttons2[15].pressed;
         attackmaya2=buttons2[7].pressed;

         const stickdeadzone2=0.4;
         const leftrigthValue2=gamepad2.axes[0];

         if(leftrigthValue2>=stickdeadzone2){
            leftpress2=true;
         } else if(leftrigthValue2<=-stickdeadzone2){
            rightpress2=true;
         }

         
         if (attackmaya2 && player2.canAttack) {
            player2.attack();
            player2.canAttack = false; // Disable further attacks until reset
        }

        // Reset attack availability when the button is released
        if (!attackmaya2) {
            player2.canAttack = true; // Re-enable attack on release
        }
        
        if (buttons2[8].pressed) {
            window.location.href = 'homepage.html';
        }
       // console.log("B7 Pressed:", attackmaya, "Can Attack:", player.canAttack);

        

    }
    moveplayer2()
  }
  const musicjump = new Audio('audio/jumpmusic.wav');
musicjump.volume = 1;
  function moveplayer2()
  {
    
    if(rightpress2)
        {
            player2.velocity.x=-5
            player2.switchSptite('run');
        }else if(leftpress2)
        {
            player2.velocity.x=5
  
        player2.switchSptite('runback');
        }
        else{
        
                player2.switchSptite('stand');
            
        }

          if(player2.velocity.y<0||player2.velocity.y>0){
                 player2.switchSptite('jump');
            } 
    
        
    if(uppress2)
        {
            player2.velocity.y=-10;
         musicjump.play();
          
           
        }
   
    

  }

function anameit2()
{
    window.requestAnimationFrame(anameit2);
    c2.fillStyle='black'
    c2.fillRect(0,0,canvas2.width,canvas2.height);
    backround2.update();
    shop2.update();
    player2.update();
    enemy2.update();

    

     player2.velocity.x = 0;
     enemy2.velocity.x = 0;

     
    
   
    //  if (keys2.leftkey.prass && k2 === 'l') {
    //     player2.velocity.x = -7;
    //     player2.switchSptite('run');
    // } else if (keys2.rightkey.prass && k2 === 'r') {
    //     player2.velocity.x = 7;
    //     player2.switchSptite('run');
    // } else {
    //    // player2.velocity.x = 0; // Reset velocity only when no key is pressed
    //     player2.switchSptite('stand');
    // }
    // if(player2.velocity.y<0||player2.velocity.y>0){
    //     player2.switchSptite('jump');
    // } 
    
    
//enemy

// if(keys2.enemyleft.prass && enemy2.lastkey==='l'){
//     enemy2.velocity.x=-5
//    enemy2.switchSptite('run');
    
// }else if(keys2.enemyright.prass && enemy2.lastkey==='r')
// {
//     enemy2.velocity.x=5
//     enemy2.switchSptite('run');
   
// }else {
//     enemy2.switchSptite('stand');
// }

// if(enemy2.velocity.y<0||enemy2.velocity.y>0){
//     enemy2.switchSptite('jump');
// } 
enemyAI()
controlerinput();

updateWins2();
if (player2.position.x >= shop2.position.x &&
    player2.position.x <= shop2.position.x + shop2.width  )
    {
        if( player2.position.y >= shop2.position.y &&
            player2.position.y <= shop2.position.y + shop2.height)
            {
                 if (backround2.getimgSrc() === './img/back2.jpg') {
                 movetonew2();
                 console.log("dd");
                }
            }
            else if( player2.position.y <= shop2.position.y &&
                player2.position.y <= shop2.position.y + shop2.height)
            {
                movetoold2();
                console.log("old");
            }
  
}

    if(isover2({r1: player2, r2: enemy2})&&player2.isAtccing)
    {
       
        
        player2.isAtccing=false;
        enemy2.heart-=20;
        document.querySelector('#playerlife2').style.width=enemy2.heart+'%';
        enemy2.switchSptite('dameg');
    }


    if(isover2({r1: enemy2, r2: player2})&&enemy2.isAtccing)
        {
            enemy2.isAtccing=false;
            player2.heart-=40;
          document.querySelector('#enemylife2').style.width=player2.heart+'%';

          
        }
        
   if(enemy2.heart<=0&&!flag2&&(player2.wins<3&&enemy2.wins<3))
   {
     player2.wins++;
     flag2=true;
     gamereset2()
     
    }else if(player2.heart<=0&&!flag2&&(player2.wins<3&&enemy2.wins<3)){
    enemy2.wins++;
    flag2=true;
    gamereset2()
    }
    if(player2.wins===3)
    {
        setTimeout(() => {
            gameoveryotam2();
        }, 1000);
       notyam2();
    }
     if(enemy2.wins===3){
        setTimeout(() => {
            gameover2();
        }, 1000);

        notmaya2();
       
    }
  

 
}
anameit2();
function gamereset2(){
    document.querySelector('#playerlife2').style.width=100+'%';
    document.querySelector('#enemylife2').style.width=100+'%';
    player2.heart = 100;
    enemy2.heart = 100;
    player2.position={ 
        x:700,
        y:0
        } 
       
        enemy2.position={ 
            x:200,
            y:0
            }
     flag2 = false;
         

}
function gameover2() {
    const imgyotam22 = document.createElement('img');
    imgyotam22.src = './img/mayaRIP.png';
    imgyotam22.style.position = 'absolute';

    // Dynamically adjust to match canvas2's position and size
    imgyotam22.style.top = `${canvas2.offsetTop}px`; 
    imgyotam22.style.left = `${canvas2.offsetLeft}px`; 
    imgyotam22.style.width = `${canvas2.offsetWidth}px`; 
    imgyotam22.style.height = `${canvas2.offsetHeight}px`; 
    imgyotam22.style.display = 'none'; 

    document.body.appendChild(imgyotam22);
    imgyotam22.style.display = 'block';
  
}

function gameoveryotam2()
{
    const gifImg2 = document.createElement('img');
    gifImg2.src = './img/zikokim1.gif';
    gifImg2.style.position = 'absolute';
    gifImg2.style.top = `${canvas2.offsetTop}px`; 
    gifImg2.style.left = `${canvas2.offsetLeft}px`; 
    gifImg2.style.width = `${canvas2.width}px`; 
    gifImg2.style.height = `${canvas2.height}px`; 
    gifImg2.style.display = 'none'; 
  
    document.body.appendChild(gifImg2);


    const imgyotam2 = document.createElement('img');
    imgyotam2.src = './img/yotamrip.png';
    imgyotam2.style.position = 'absolute';
    imgyotam2.style.width = `500px`; 
    imgyotam2.style.height = `500px`; 
    imgyotam2.style.display = 'none'; 

    document.body.appendChild(imgyotam2);


    function centerImgYotam2() {
        const gifRect2 = gifImg2.getBoundingClientRect(); 
        const yotamWidth2 = imgyotam2.offsetWidth;
        const yotamHeight2 = imgyotam2.offsetHeight;
        
        imgyotam2.style.top = `${gifRect2.top + (gifRect2.height / 2) - (yotamHeight2 / 2)}px`;
        imgyotam2.style.left = `${gifRect2.left + (gifRect2.width / 2) - (yotamWidth2 / 2)}px`;
    }


    gifImg2.style.display = 'block';
    imgyotam2.style.display = 'block';
 
    centerImgYotam2();

    
    canvas2.style.display = 'none';

       
}
function notyam2(){
    gifImg2.style.display = 'none';
    imgyotam2.style.display = 'none';
 


    
    canvas2.style.display = 'block';
}
function notmaya2(){
    imgyotam22.style.display = 'none';
    canvas2.style.display = 'block';
}
function movetonew2()
{
 
    backround2.setimgSrc('./img/b80.png');
    backround2.position.y = 0; 
    backround2.position.x = 0; 

     player2.position.x=700;
     enemy2.position.x=200;
  
     player2.position.y=0;
     enemy2.position.y=0;

     player2.offset.x=0;
     enemy2.offset.x=0

     player2.offset.y=20
     enemy2.offset.y=15

     player2.scal=0.6
     enemy2.scal=0.6
     backround2.scal=1;
 

     shop2.position.x=1050
     shop2.position.y=420



}
function movetoold2() {

    backround2.setimgSrc('./img/back2.jpg');
    backround2.position.y = 0;
    backround2.position.x = 0;

    player2.position.x = 700;
    enemy2.position.x = 200;

    player2.position.y = 0;
    enemy2.position.y = 0;

    player2.offset.x = 0;
    enemy2.offset.x = 0

    player2.offset.y = 80
    enemy2.offset.y = 70

    player2.scal = 0.5
    enemy2.scal = 0.5
    backround2.scal = 1.02;


    shop2.position.x = 50
    shop2.position.y = 230



}
function enemyAI() {
    const distanceX = player2.position.x - enemy2.position.x;
    const distanceY = player2.position.y - enemy2.position.y;

    enemy2.velocity.x = 0;

    if (Math.abs(distanceX) > 50) { 
        if (distanceX > 0) {
            enemy2.velocity.x = Math.min(15, distanceX / 50); 
            enemy2.lastkey = 'r';
            enemy2.switchSptite('run');
        } else {
            enemy2.velocity.x = Math.max(-15, distanceX / 50);
            enemy2.lastkey = 'l';
            enemy2.switchSptite('run');
        }
        if (player2.isAttacking) {
            if (player2.position.x < enemy2.position.x) {
            
                enemy2.velocity.x = -15; 
                enemy2.lastkey = 'l';
            } else {
                enemy2.velocity.x = 15;
                enemy2.lastkey = 'r';
            }
            enemy2.switchSptite('run');
        
        }
    } else if (Math.abs(distanceX) <= 50 && Math.abs(distanceX) > 10 && !enemy2.isAttacking) {

        if (distanceX > 0) {
            enemy2.velocity.x = 2; 
        } else {
            enemy2.velocity.x = -2;
        }
    } if (Math.abs(distanceX) <= 50 && Math.abs(distanceY) <= 50 && !enemy2.isAttacking) {
        if (enemy2.canAttack) {
            enemy2.attack();
            enemy2.canAttack = false; 
            enemy2.isAttacking = true; 
         
            setTimeout(() => {
                enemy2.isAttacking = false;
            }, 1000);
    
          
            setTimeout(() => {
                enemy2.canAttack = true;
            }, 1000); 
        }
       
    }

    console.log(Math.abs(distanceX));

    if (Math.random() < 0.01 && enemy2.position.y + enemy2.height >= canvas2.height - 400 && !enemy2.isJumping) {
        enemy2.velocity.y = -15;
        enemy2.switchSptite('jump');
        enemy2.isJumping = true;
        setTimeout(() => { enemy2.isJumping = false; }, 500); 
    }


   

    if (enemy2.velocity.x === 0 && enemy2.velocity.y === 0 && !enemy2.isAttacking) {
        enemy2.switchSptite('stand');
    }
}












window.addEventListener('keydown', function(e) {
    //    console.log(e.key);
    switch(e.key) {
        
 
        case "ArrowUp":
            if (player2.position.y + player2.height >= canvas2.height - 400) {
                player2.velocity.y = -17; // Only jump if on the ground
            }
            break;
            

         case "ArrowLeft":
           keys2.leftkey.prass=true;
           k2='l'
            break;
        case "ArrowRight":
            keys2.rightkey.prass=true;
            k2='r';
            break;
        case ' ':
            player2.velocity.y=-17
            break;
        case 'Enter':
            player2.attack();
           break;
//enemy
           case "w":
            enemy2.velocity.y= -10;
            break;

         case "a":
            keys2.enemyleft.prass=true;
           enemy2.lastkey='l'
            break;
        case "d":
            keys2.enemyright.prass=true;
             enemy2.lastkey='r'
            break;
        case 's':
            enemy2.velocity.y=-22
            break;
        case 'q':
            enemy2.attack();
           break;
    }
})

window.addEventListener("keyup", function(e) {
  switch(e.key) {
    //   case "ArrowUp":
    //   case "ArrowDown":
       
    //       break;
      case "ArrowLeft":
         keys2.leftkey.prass=false;
         break;
      case "ArrowRight":
      keys2.rightkey.prass=false;
      break;

      case 'a':
     keys2.enemyleft.prass=false;
    break;

     case 'd':
     keys2.enemyright.prass=false;
     break;

     
      
    //   case 'Enter':
    //     player.isAtccing=false;
    //    break;

    
      
  }
 })
 
