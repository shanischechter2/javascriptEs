// const gravity=0.8;


class Sprite{
    constructor({position,imgSrc,scal=1,framax=1,offset={x:0,y:0},  framhold,canvas}){
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
        this.canvas=canvas;
        this.c=this.canvas.getContext('2d');
        this._imgSrc = imgSrc; 
    }
    getimgSrc() {
        return this._imgSrc;
    }

    setimgSrc(newSrc) {
         this._imgSrc = newSrc;
         this.img.src = newSrc; 
      
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
         
       this.c.drawImage(this.img,
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
    constructor({position,velocity,sprites,color,offset, imgSrc,scal=1,framax=1,framhold,canvas}){
        
      super(
            {
                position,
                imgSrc,
                scal,
                framax,
                offset,
                framhold,
                canvas

           
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
        this.canAttack = true;
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
       if(this.position.y+this.height+this.velocity.y>=this.canvas.height-400)
       {
        
         this.velocity.y=0;
         this.position.y = this.canvas.height - 400 - this.height; 

         // Only switch to "stand" if not moving horizontally
         if (this.velocity.x === 0) {
             this.switchSptite('stand');
         }

         
       }
       else{
        this.velocity.y+=gravity;
 
        }
         
    //    if (this.position.x + this.width + this.velocity.x >= canvas.width) {
    //     this.velocity.x = 0;
    
    if (this.position.x + this.velocity.x <= 0) {
     
        this.velocity.x = 0;
        this.position.x = 0;
    }
    else if(this.position.x + this.velocity.x >= this.canvas.width)
    {
        this.velocity.x = 0;
        this.position.x = this.canvas.width;
        this.position.y=260;
    }
 
    if (this.position.x + this.velocity.x <= 0) {
    
        this.velocity.x = 0;
        this.position.x = 0; 
    }
    if (this.position.x + this.velocity.x <= 0) {
        this.velocity.x = 0;
        this.position.x = 0;
    } else if (this.position.x + this.velocity.x >= this.canvas.width) {
        this.velocity.x = 0;
        this.position.x = this.canvas.width;
    }
     


    }
    attack()
    {
        if (this.canAttack) { // Attack allowed check
            this.switchSptite('attak1');
            this.isAtccing = true;
            this.canAttack = false; // Lock attack
            setTimeout(() => {
                this.isAtccing = false;
            }, 10); // End animation state
        }
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
               this.framhold=5;
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

                    case 'dameg':
                        if(this.img!==this.sprites.dameg.img)
                            {
                                this.img=this.sprites.dameg.img;
                                 this.framax=this.sprites.dameg.framax;
                                 this.framhold=this.sprites.dameg.framhold;
                                 this.framcurrent=0;
                             //   this.animatted();
                            }
                             
                            break;  

         case 'runback':
            if(this.img!==this.sprites.runback.img)
              {
                 this.img=this.sprites.runback.img
                   this.framax=this.sprites.runback.framax;
                // this.framhold=this.sprites.runback.framhold;
                 this.framcurrent=0;
                 //   this.animatted();
                     }
                                     
               break;                 

        }
        
    }
}