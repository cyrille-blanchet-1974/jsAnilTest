class Box{
    constructor(divobj,startx,starty,speed) {  
      this.boxside = 30;
      this.box = document.getElementById(divobj);
      this.container = document.getElementById("container");
      this.container.width = 800 + "px";
      this.container.height = 600 + "px";
      this.box.width = 30 + "px";
      this.box.height = 30 + "px";      
      this.maxx = 770;
      this.maxy = 570;
      this.minx = 30;
      this.miny = 30;
      this.startx=startx;
      this.starty=starty;
      this.speed=speed;
      this.reset();
    }
   draw(){
     this.box.style.top = this.y + "px";
     this.box.style.left = this.x + "px";
   }

   reset(){
       this.x = this.startx;
       this.y = this.starty;
       this.incx = this.speed;
       this.incy = this.speed;
       this.draw();
   }

   move(boxes){
       var myself=this;
    boxes.forEach( function(item, index, array) {
         if(myself.bing(item)){
            //reverse
            myself.incx = -myself.incx;
            myself.incy = -myself.incy;    
         } 
        });

    if( this.x > this.maxx){
        this.incx = -this.incx;
        console.log('Change X direction');
    }
    if( this.x < this.minx){
        this.incx = -this.incx;
        console.log('Change X direction');
    }
    if(this.y > this.maxy){
        this.incy = -this.incy;
        console.log('Change Y direction');
    }
    if(this.y < this.miny){
        this.incy = this.incy;
        console.log('Change Y direction');
    }
    this.x += this.incx;
    this.y += this.incy;
    this.draw();
   }

   bing(otherbox){
    //never collide with self
    if(otherbox === this) return false;
    var startx=this.x;
    var endx=startx+this.boxside;
    var starty=this.y;
    var endy=starty + this.boxside;
    if(otherbox.x >= startx && otherbox.x <= endx && otherbox.y >= starty && otherbox.y <= endy) return true;
    var startx=otherbox.x;
    var endx=startx+this.boxside;
    var starty=otherbox.y;
    var endy=starty + this.boxside;
    if(this.x >= startx && this.x <= endx && this.y >= starty && this.y <= endy) return true;
    return false;
    }
}

class Animate{
    constructor() {
        this.boxes=[];
        this.reset();
    }
    add(box){
        this.boxes.push(box);
        //b.reset.call(b);
        box.reset();
    }
    stop(){
        this.askstop = true;
    }
    reset(){
        if(this.boxes.length > 0){
            this.boxes.forEach( function(item, index, array) {
                item.reset();
            });
        }
        this.askstop = false;
        this.boxes.forEach( function(item, index, array) {
            item.draw();
        });
    }
 
    okToContinue(){
        if(this.askstop) return false;
        return true;
       }

    //animation  smooth (synch with render) 
    action() {
        if(this.boxes.length > 0){
            var boxes2 = this.boxes;
            this.boxes.forEach( function(item, index, array) {
                item.move(boxes2);
                });
        }
        if(this.okToContinue()) requestAnimationFrame(callbackani);
    }
  
} 

function callbackani(){
    ani.action();
}
