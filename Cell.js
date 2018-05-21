function Cell(x, y, active) {
    this.x = x;
    this.y = y;
    this.active = active;

    this.draw = function () {
        let d = this.countNeighbours(grid);
        if (this.active) {
            fill(0, (d * 25) + BACKGROUND_COLOUR, 0);
        } else {
            fill(0, (d * 10) + BACKGROUND_COLOUR, 0);
        }
        ellipse(this.x * resolution, this.y * resolution, randomGaussian(resolution, 0.5));
    }

    this.getNext = function (g, n) {
        let neighbours = this.countNeighbours(g);

        n.matrix[this.x][this.y] = Object.assign({}, this);

        if (!this.active && neighbours == 3) {
            n.matrix[this.x][this.y].active = true;
        } else if (this.active && (neighbours < 2 || neighbours > 3)) {
            n.matrix[this.x][this.y].active = false;
            this.spawnCheck();
        }

    }

    this.countNeighbours = function (g) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (this.x + i + g.cols) % g.cols;
                let row = (this.y + j + g.rows) % g.rows;

                if (g.matrix[col][row].active) {
                    sum++
                }
            }
        }
        if (this.active) {
            sum--;
        }
        return sum;
    }

    this.spawnCheck = function () {
        let rnd = random(1);
        if (rnd < BIRTH_RATE){
            let snake = new Snake(this.x, this.y, new DNA());
            snakes.push(snake);
        }
    }
}


