class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    draw() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
    
    collide(ray) {
        let { x1, y1, x2, y2 } = ray;
        let { x : rx, y : ry, width : rw, height : rh } = this;

        const left =   lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
        const right =  lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
        const top =    lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
        const bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

        let min = Infinity;
        let closest;

        for (let i of [left, right, top, bottom]) {
            if (i) {
                let distance = dist(x1, y1, i.x, i.y);

                if (distance < min) {
                    min = distance;
                    closest = i;
                }
            }
        }
        
        if (closest) return closest;

        return false;
    }
}
 