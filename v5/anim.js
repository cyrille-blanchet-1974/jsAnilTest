class Box {
    constructor(divobj, startx, starty, speedx, speedy) {
        this.container = document.getElementById("container");
        var containerwidth = 800;
        var containerheight = 800;
        this.container.width = containerwidth + "px";
        this.container.height = containerheight + "px";
        this.box = document.getElementById(divobj);
        this.boxside = 45;
        this.box.width = this.boxside + "px";
        this.box.height = this.boxside + "px";
        this.maxx = containerwidth - this.boxside;
        this.maxy = containerheight - this.boxside;
        this.minx = 1;
        this.miny = 1;
        this.startx = startx;
        this.starty = starty;
        this.speedx = speedx;
        this.speedy = speedy;
        this.reset();
    }

    draw() {
        this.box.style.top = this.y + "px";
        this.box.style.left = this.x + "px";
    }

    reset() {
        this.x = this.startx;
        this.y = this.starty;
        this.incx = this.speedx;
        this.incy = this.speedy;
        this.draw();
    }

    move(boxes) {
        var myself = this;
        var changed = false;
        boxes.forEach(function (item, index, array) {
            if (!changed && myself.bing(item)) {
                //reverse
                myself.incx = -myself.incx;
                myself.incy = -myself.incy;
                changed = true;
            }
        });

        if (!changed && (this.x > this.maxx || this.x < this.minx)) {
            this.incx = -this.incx;
        }
        if (!changed && (this.y > this.maxy || this.y < this.miny)) {
            this.incy = -this.incy;
        }
        this.x += this.incx;
        this.y += this.incy;
        this.draw();
    }

    bing(otherbox) {
        //never collide with self
        if (otherbox === this) return false;
        if (otherbox.x >= this.x && otherbox.x <= (this.x + this.boxside) && otherbox.y >= this.y && otherbox.y <= (this.y + this.boxside)) return true;
        if (this.x >= otherbox.x && this.x <= (otherbox.x + this.boxside) && this.y >= otherbox.y && this.y <= (otherbox.y + this.boxside)) return true;
        return false;
    }
}

class Animate {
    constructor() {
        this.boxes = [];
        this.reset();
    }
    add(box) {
        this.boxes.push(box);
        //b.reset.call(b);
        box.reset();
    }
    stop() {
        this.askstop = true;
    }
    reset() {
        if (this.boxes.length > 0) {
            this.boxes.forEach(function (item, index, array) {
                item.reset();
            });
        }
        this.askstop = false;
        this.boxes.forEach(function (item, index, array) {
            item.draw();
        });
    }

    okToContinue() {
        if (this.askstop) return false;
        return true;
    }

    //animation  smooth (synch with render) 
    action() {
        if (this.boxes.length > 0) {
            var boxes2 = this.boxes;
            this.boxes.forEach(function (item, index, array) {
                item.move(boxes2);
            });
        }
        if (this.okToContinue()) requestAnimationFrame(callbackani);
    }

}

function callbackani() {
    ani.action();
}
