class Scene {
    constructor(xOffset, width, height) {
        this.scene = [];
        this.xOffset = xOffset;

        this.width = width;
        this.height = height;
    }

    draw() {
        let spacing = this.width / this.scene.length;

        noStroke();
        for (let i = 0; i < this.scene.length; i++) {
            if (this.scene[i]) {
                const sq = this.scene[i] * this.scene[i];

                fill(map(sq, 0, displayWidth * displayWidth + this.height * this.height, 255, 0));

                let x = this.xOffset + spacing * i;

                let height = map(this.scene[i], 0, width, this.height, 0);
                rect(x, (this.height - height) / 2, spacing, height);
            }
        }
    }
}
