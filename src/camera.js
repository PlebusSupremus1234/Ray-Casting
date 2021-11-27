class Camera {
    constructor(x, y, direction, FoV) {
        this.x = x;
        this.y = y;
        this.dir = direction;
        this.FoV = FoV;
        this.resolution = 20;
    }

    draw() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 10);
    }
}
