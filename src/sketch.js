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
let displayHeight;

const camera = new Camera(
    50, 50, // Position
    45, // Direction
    45, // FoV
    2, // Resolution
);

let FoVSlider;

let ResSlider;

function setup() {
    let width = 30;
    let height = 20;
    let cellSize = 25;

    displayWidth = width * cellSize;
    displayHeight = height * cellSize;

    createCanvas(displayWidth + 500, displayHeight);

    for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].length; j++) {
            if (template[i][j] == "X") {
                grid.push(new Cell(j * cellSize, i * cellSize, cellSize, cellSize));
            }
        }
    }

    FoVSlider = createSlider(
        1, // Min
        360, // Max
        45, // Value
        1, // Step
    );
    FoVSlider.style('width', '80px');

    ResSlider = createSlider(
        3.25, // Min
        7.95, // Max
        4, // Value
        0.05, // Step
    );
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
    camera.resolution = 8 - ResSlider.value();
    camera.draw();

    const scene = new Scene(displayWidth, 500, height);

    for (let i = camera.dir - camera.FoV / 2; i < camera.dir + camera.FoV / 2; i += camera.resolution) {
        let ray = new Ray(camera.x, camera.y, i);
        let distance = ray.cast(grid);

        if (distance) {
            const a = ray.heading - camera.dir;
            distance *= Math.cos(radians(a));

            scene.scene.push(distance);
        } else scene.scene.push(null);
    }

    scene.draw();
}
