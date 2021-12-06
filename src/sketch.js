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

let displayWidth;

const camera = new Camera(
    50, 50, // Position
    Math.PI / 4, // Direction
    Math.PI / 4, // FoV
    Math.PI / 50, // Resolution
);

let FoVSlider;
let ResSlider;

function setup() {
    let width = 30;
    let height = 20;
    let cellSize = 25;

    displayWidth = width * cellSize;

    createCanvas(displayWidth + 500, height * cellSize);

    for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].length; j++) {
            if (template[i][j] == "X") {
                grid.push(new Cell(j * cellSize, i * cellSize, cellSize, cellSize));
            }
        }
    }

    FoVSlider = createSlider(0, 2 * Math.PI, Math.PI / 4, 0.01);
    FoVSlider.style('width', '80px');
    ResSlider = createSlider(Math.PI / 500, Math.PI / 10, Math.PI / 50, Math.PI / 100);
    ResSlider.style('width', '80px');
}

function draw() {
	background(0);

    noStroke();
    for (let i of grid) i.draw();

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) camera.x -= 2;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) camera.x += 2;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) camera.y -= 2;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) camera.y += 2;

    if (mouseIsPressed) {
        if (mouseX < width && mouseY < height) {
            const angle = bearing(camera.x, camera.y, mouseX, mouseY);
            camera.dir = angle;
        }
    }

    camera.FoV = FoVSlider.value();
    // camera.resolution = ResSlider.value();
    camera.resolution = Math.PI / 5000;
    camera.draw();

    const scene = new Scene(displayWidth, 500, height);

    for (let i = camera.dir - camera.FoV / 2; i < camera.dir + camera.FoV / 2; i += camera.resolution) {
        let ray = new Ray(camera.x, camera.y, i);
        let distance = ray.cast(grid);

        if (distance) {
            const a = ray.heading - camera.dir;
            distance *= Math.cos(a);

            scene.scene.push(distance);
        } else scene.scene.push(null);
    }

    scene.draw();
}
