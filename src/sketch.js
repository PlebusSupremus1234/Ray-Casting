let template = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X        X                   X",
    "X        X                   X",
    "X        X                   X",
    "X        XXXXXX              X",
    "X                            X",
    "X            X               X",
    "X    X       X               X",
    "X    X       X               X",
    "X         XXXX               X",
    "X                            X",
    "X                            X",
    "X                            X",
    "X                            X",
    "X     XXXXXXXXXXXX           X",
    "X                            X",
    "X                            X",
    "X                            X",
    "X                            X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
];

let grid = [];

const camera = new Camera(50, 50, Math.PI / 4, Math.PI / 4);

function setup() {
    let width = 30;
    let height = 20;
    let cellSize = 25;

    createCanvas(width * cellSize, height * cellSize);

    for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].length; j++) {
            if (template[i][j] == "X") {
                grid.push(new Cell(j * cellSize, i * cellSize, cellSize, cellSize));
            }
        }
    }
}

function draw() {
	background(0);

    noStroke();
    for (let i of grid) {
        i.draw();
    }

    camera.draw();

    for (let i = camera.dir - camera.FoV / 2; i < camera.dir + camera.FoV / 2; i += camera.FoV / camera.resolution) {
        let ray = new Ray(camera.x, camera.y, i);
        ray.cast(grid);
    }
}
