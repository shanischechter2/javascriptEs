const canvas= document.querySelector('canvas');
const c=canvas.getContext('2d');

canvas.width=1700;
canvas.height=810;

c.fillRect(0,0,canvas.width,canvas.height);
const gravity=0.8;

const backround= new Sprite({
    position: {
        x:0,
        y:0
    },
    imgSrc: './img/back2.jpg'
})
const shop= new Sprite({
    position: {
        x:50,
        y:230
    },
    imgSrc: './img/shop.png',
    scal: 2.5,
    framax:6,
    framhold:8
})


const player=new Fighter({
    position:{
    x:700,
    y:0
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
        jump:{
            imgSrc: './img/mj2.png',
            framax: 2
        },
        attak1:{
            imgSrc: './img/msy7.png',
            framax: 7,
           framhold:5
        }
     }

});


const enemy=new Fighter({
    position:{
        x:200,
        y:0
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
           }
         }

});
const keys={
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
console.log(keys);
let k;
let flag=false;

function isover({r1,r2})
{
    return (r1.attacbax.position.x+r1.attacbax.width>=r2.attacbax.position.x&&
        r1.attacbax.position.x<=r2.position.x+r2.width&&
        r1.attacbax.position.y+r1.attacbax.height>=r2.position.y);
}
let y=true;
const div = document.querySelector('#countwins');

   function updateWins() {
   
    div.innerHTML = `${enemy.wins} :  ${player.wins} `;

  }

function anameit()
{
    window.requestAnimationFrame(anameit);
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height);
    backround.update();
    shop.update();
    player.update();
     enemy.update();
     
    player.velocity.x=0;
    enemy.velocity.x=0;
   

    if(keys.leftkey.prass&& k==='l'){
        player.velocity.x=-5
        player.switchSptite('run');
      
 
        
    }else if(keys.rightkey.prass&& k==='r')
    {
        player.velocity.x=5
  
        player.switchSptite('run');
       
    }else {
        player.switchSptite('stand');
    }

    if(player.velocity.y<0||player.velocity.y>0){
        player.switchSptite('jump');
    } 
//enemy

    if(keys.enemyleft.prass && enemy.lastkey==='l'){
        enemy.velocity.x=-5
       enemy.switchSptite('run');
        
    }else if(keys.enemyright.prass && enemy.lastkey==='r')
    {
        enemy.velocity.x=5
        enemy.switchSptite('run');
       
    }else {
        enemy.switchSptite('stand');
    }

    if(enemy.velocity.y<0||enemy.velocity.y>0){
        enemy.switchSptite('jump');
    } 
   
  updateWins();
    if(isover({r1: player, r2: enemy})&&player.isAtccing)
    {
       
        
        player.isAtccing=false;
        enemy.heart-=20;
        document.querySelector('#playerlife').style.width=enemy.heart+'%';
    }
    if(isover({r1: enemy, r2: player})&&enemy.isAtccing)
        {
            enemy.isAtccing=false;
            player.heart-=20;
          document.querySelector('#enemylife').style.width=player.heart+'%';
          
        }
        
   if(enemy.heart<=0&&!flag&&(player.wins<3&&enemy.wins<3))
   {
     player.wins++;
     flag=true;
     gamereset()
     
    }else if(player.heart<=0&&!flag&&(player.wins<3&&enemy.wins<3)){
    enemy.wins++;
    flag=true;
    gamereset()
    }
    if(player.wins===3)
    {
        setTimeout(() => {
            gameoveryotam();
        }, 1000);
       notyam();
    }
     if(enemy.wins===3){
        setTimeout(() => {
            gameover();
        }, 1000);

        notmaya();
       
    }
  

 
}
anameit();
function gamereset(){
    document.querySelector('#playerlife').style.width=100+'%';
    document.querySelector('#enemylife').style.width=100+'%';
    player.heart = 100;
    enemy.heart = 100;
    player.position={ 
        x:700,
        y:0
        } 
       
        enemy.position={ 
            x:200,
            y:0
            }
     flag = false;
         

}
function gameover()
{

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
   // canvas.style.display = 'none';

 
       
}
function gameoveryotam()
{
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
function notyam(){
    gifImg.style.display = 'none';
    imgyotam.style.display = 'none';
 


    
    canvas.style.display = 'block';
}
function notmaya(){
    imgyotam2.style.display = 'none';
 


    
    canvas.style.display = 'block';
}
  





window.addEventListener('keydown', function(e) {
    //    console.log(e.key);
    switch(e.key) {
 
        case "ArrowUp":
            player.velocity.y= -10;
            break;

         case "ArrowLeft":
           keys.leftkey.prass=true;
           k='l'
            break;
        case "ArrowRight":
            keys.rightkey.prass=true;
            k='r';
            break;
        case ' ':
            player.velocity.y=-17
            break;
        case 'Enter':
            player.attackplayer();
           break;

           //enemy
           case "w":
            enemy.velocity.y= -10;
            break;

         case "a":
            keys.enemyleft.prass=true;
           enemy.lastkey='l'
            break;
        case "d":
            keys.enemyright.prass=true;
             enemy.lastkey='r'
            break;
        case 's':
            enemy.velocity.y=-22
            break;
        case 'q':
            enemy.attackenemy();
           break;
    }
})

window.addEventListener("keyup", function(e) {
  switch(e.key) {
    //   case "ArrowUp":
    //   case "ArrowDown":
       
    //       break;
      case "ArrowLeft":
         keys.leftkey.prass=false;
         break;
      case "ArrowRight":
      keys.rightkey.prass=false;
      break;

      case 'a':
     keys.enemyleft.prass=false;
    break;

     case 'd':
     keys.enemyright.prass=false;
     break;
    //   case 'Enter':
    //     player.isAtccing=false;
    //    break;

    
      
  }
 })
 




