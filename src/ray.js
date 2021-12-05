class Ray {
    constructor(x, y, direction) {
        this.x1 = x;
        this.y1 = y;

        this.x2 = x + 1000 * Math.cos(direction);
        this.y2 = y + 1000 * Math.sin(direction);

        this.bearing = bearing(this.x1, this.y1, this.x2, this.y2);
    }

    cast(grid) {
        let minDist = Infinity;
        let closest;

        for (let i = 0; i < grid.length; i++) {
            let collision = grid[i].collide(this);
            if (collision) {
                const distance = dist(this.x1, this.y1, collision.x, collision.y);

                if (distance < minDist) {
                    minDist = distance;
                    closest = collision;
                }
            }
        }

        if (closest) {
            stroke(255, 0, 0);
            line(this.x1, this.y1, closest.x, closest.y);

            return dist(this.x1, this.y1, closest.x, closest.y);
        }
    }
}