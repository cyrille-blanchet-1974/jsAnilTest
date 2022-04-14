class box{
    constructor() {  
      this.box = document.getElementById("box");
      this.container = document.getElementById("container");
      this.container.width = 800 + "px";
      this.container.height = 600 + "px";
      this.box.width = 30 + "px";
      this.box.height = 30 + "px";      
      this.maxx = 770;
      this.maxy = 570;
      this.reset();
    }
   draw(){
     this.box.style.top = this.y + "px";
     this.box.style.left = this.x + "px";
   }

   stop(){
       this.askstop = true;
   }
   reset(){
       this.x = 1;
       this.y = 1;
       this.incx = 1;
       this.incy = 1;
       this.maxloop = 10;
       this.askstop = false;
       this.draw();
   }

   move(){
    if(this.incx==1 && this.x > this.maxx){
        this.incx = -1;
        this.maxloop -= 1;
        console.log('Change X direction');
    }
    if(this.incx==-1 && this.x <1){
        this.incx = 1;
        this.maxloop -= 1;
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

   okToContinue(){
    if(this.askstop) return false;
    if(this.maxloop > 0) return true;
    return false;
   }

   //manual 
   ani1() {
       this.move();
   }
   //no visualisation because render done after recursive call 
   ani2() {
        this.move();
        if(this.okToContinue()) this.ani2();
    }
    //animation not smooth (move mutiple times between renders) 
    ani3() {
        this.move();
        if(this.okToContinue()) setTimeout(this.ani3.call(this),0);
    }
    
    //animation not smooth (not synch with render) 
    ani4() {
        this.move();
        if(this.okToContinue()) setTimeout(this.ani4.call(this),1000/60);
    }
    //animation  smooth (synch with render) 
    ani5() {
        this.move();
        if(this.okToContinue()) requestAnimationFrame(callbackani5);
    }

}

function callbackani5(){
    //box2.move();
    //if(box2.okToContinue) requestAnimationFrame(callbackani5)
    box2.ani5();
}