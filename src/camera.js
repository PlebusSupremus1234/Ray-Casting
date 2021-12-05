class Camera {
    constructor(x, y, direction, FoV, resolution) {
        this.x = x;
        this.y = y;
        this.dir = direction;
        this.FoV = FoV;
        this.resolution = resolution;
    }

    draw() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 10);
    }
}
