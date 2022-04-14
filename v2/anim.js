class Box{
    constructor(divobj,startx,starty) {  
      this.box = document.getElementById(divobj);
      this.container = document.getElementById("container");
      this.container.width = 800 + "px";
      this.container.height = 600 + "px";
      this.box.width = 30 + "px";
      this.box.height = 30 + "px";      
      this.maxx = 770;
      this.maxy = 570;
      this.startx=startx;
      this.starty=starty;
      this.reset();
    }
   draw(){
     this.box.style.top = this.y + "px";
     this.box.style.left = this.x + "px";
   }

   reset(){
       this.x = this.startx;
       this.y = this.starty;
       this.incx = 1;
       this.incy = 1;
       this.draw();
   }

   move(){
    if(this.incx==1 && this.x > this.maxx){
        this.incx = -1;
        console.log('Change X direction');
    }
    if(this.incx==-1 && this.x <1){
        this.incx = 1;
        console.log('Change X direction');
    }
    if(this.incy==1 && this.y > this.maxy){
        this.incy = -1;
        console.log('Change Y direction');
    }
    if(this.incy==-1 && this.y <1){
        this.incy = 1;
        console.log('Change Y direction');
    }
    this.x += this.incx;
    this.y += this.incy;
    this.draw();
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
            this.boxes.forEach( function(item, index, array) {
                item.move();
                });
        }
        if(this.okToContinue()) requestAnimationFrame(callbackani);
    }
  
} 

function callbackani(){
    ani.action();
}
