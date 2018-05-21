function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noStroke();
    // frameRate(1)
    initialise();
}

function draw() {
    background(color(0, BACKGROUND_COLOUR, 0));

    if (counter % cellStep === 0) {
        var next = new Grid();

        next.create();

        for (var i = 0; i < grid.matrix.length; i++) {
            for (var j = 0; j < grid.matrix[i].length; j++) {
                grid.matrix[i][j].getNext(grid, next);
            }
        }

        grid = next;
    }

    snakes.forEach(x => x.move());

    grid.draw();

    snakes.forEach(x => x.draw());

    counter++;
}

function initialise() {
    grid = new Grid();
    grid.create();
    grid.fill();
    snakes = [];

    // for (var i = 0; i < 20; i++) {
    //     let snake = new Snake(floor(random(grid.cols)), floor(random(grid.rows)), new DNA());
    //     snakes.push(snake);
    // }
}

function touchStarted() {
    initialise();
}

function keyPressed() {
    if (keyCode == ENTER) {
        initialise();
    }
}


