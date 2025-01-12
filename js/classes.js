// const gravity=0.8;


class Sprite{
    constructor({position,imgSrc,scal=1,framax=1,offset={x:0,y:0},  framhold}){
        this.position =position;
     
        this.height=150;
        this.width=100;
        this.img=new Image();
        this.img.src=imgSrc;
        this.scal=scal;
        this.framax=framax;
        this.framcurrent=0;
        this.framelapsd=0;
    //    this.framhold=6.5;
        this.offset=offset;
        this.framhold=framhold;
    }
    animatted(){
        
        this.framelapsd++;
        if(this.framelapsd%this.framhold===0)
            {
                  if(this.framcurrent<this.framax-1)
                {
              
                    this.framcurrent++;
                   
                }else{
                     this.framcurrent=0;
                   
               }
            }
            
    }


    draw(){
         
       c.drawImage(this.img,
       this.framcurrent*(this.img.width/this.framax) ,
        0,
        this.img.width /this.framax,
        this.img.height,
        this.position.x-this.offset.x,
        this.position.y-this.offset.y,
        (this.img.width/this.framax) *this.scal 
        ,this.img.height*this.scal);
         
    }
    update(){
        this.draw();
       this.animatted();

    }
 
}

class Fighter extends Sprite{
    constructor({position,velocity,sprites,color,offset, imgSrc,scal=1,framax=1,framhold}){
        
      super(
            {
                position,
                imgSrc,
                scal,
                framax,
                offset,
                framhold

           
            }
        )
        this.velocity=velocity
        this.height=150;
        this.width=50;
       
        this.attacbax={
            position: {
                x: this.position.x,
                y:this.position.y
            },
            height: 50,
            width: 100,
            
            offset
        }
        this.color=color;
        this.sprites=sprites
        this.lastkey;
        this.isAtccing=false;
        this.heart=100;
        offset={x:0,y:0};
        this.framcurrent=0;
        this.framelapsd=0;
        this.wins=0;
        
         for(const s in sprites){
            sprites[s].img=new Image();
            sprites[s].img.src=sprites[s].imgSrc;
         }
    }
    
   
    update(){
        this.draw();
        this.animatted();
     
       
      

        this.attacbax.position.x=this.position.x - this.attacbax.offset.x;
        this.attacbax.position.y=this.position.y;
   
       this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
       if(this.position.y+this.height+this.velocity.y>=canvas.height-400)
       {
         this.velocity.y=0;
       }
       else{
        this.velocity.y+=gravity;
    //     if(this.framcurrent<this.framax-1)
    //         {
          
    //             this.framcurrent++;
    //         }else{
    //              this.framcurrent=0;
    //             // this.framcurrent=5;
                
                
    //         }
        }
    //    if (this.position.x + this.width + this.velocity.x >= canvas.width) {
    //     this.velocity.x = 0;
    
    if (this.position.x + this.velocity.x <= 0) {
     
        this.velocity.x = 0;
        this.position.x = 0;
    }
    else if(this.position.x + this.velocity.x >= canvas.width)
    {
        this.velocity.x = 0;
        this.position.x = canvas.width;
        this.position.y=260;
    }
 
    if (this.position.x + this.velocity.x <= 0) {
    
        this.velocity.x = 0;
        this.position.x = 0; 
    }
     


    }
    attackplayer()
    {
        this.switchSptite('attak1');

        this.isAtccing=true;
        setTimeout(() => {
            this.isAtccing=false;
        }, 100);
    }
    attackenemy()
    {
        this.switchSptite('attak1');
        this.isAtccing=true;
        setTimeout(() => {
            this.isAtccing=false;
        }, 100);
    }

    switchSptite(sprite)
    {

        if(this.img===this.sprites.attak1.img&&this.framcurrent<this.sprites.attak1.framax-1) 
            {
                return;
            }
        switch(sprite){
         case 'stand':
            
            if(this.img!==this.sprites.stand.img)
            {
                this.img=this.sprites.stand.img;
                   this.framax=this.sprites.stand.framax;
                 this.framcurrent=0;
                 this.framhold=10;
              //   console.log( this.framcurrent);
                
            }
           
           break;
         case 'run':
            if(this.img!==this.sprites.run.img)
            {
                this.img=this.sprites.run.img;
                 this.framax=this.sprites.run.framax;
               this.framcurrent=0;
               this.framhold=10;
                // this.animatted();
            }
             
            break;   
            case 'jump':
            if(this.img!==this.sprites.jump.img)
            {
                this.img=this.sprites.jump.img;
                 this.framax=this.sprites.jump.framax;
                 this.framcurrent=0;
                 this.framhold=10;
                // this.animatted();
            }
             
            break;   
            case 'attak1':
                if(this.img!==this.sprites.attak1.img)
                    {
                        this.img=this.sprites.attak1.img;
                         this.framax=this.sprites.attak1.framax;
                         this.framhold=this.sprites.attak1.framhold;
                         this.framcurrent=0;
                     //   this.animatted();
                    }
                     
                    break;  

        }
        
    }
}