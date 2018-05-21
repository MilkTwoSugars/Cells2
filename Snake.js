function Snake(x, y, dna) {

    this.x = x;
    this.y = y;

    this.dna = dna;

    this.directions = ["DIR_UP", "DIR_UP_RIGHT","DIR_RIGHT", "DIR_DOWN_RIGHT", "DIR_DOWN", "DIR_DOWN_LEFT", "DIR_LEFT", "DIR_UP_LEFT"];
    this.direction = random(this.directions);

    this.speed = 1;
    this.energy = this.dna.energy;

    this.alive = true;

    this.draw = function () {

        if (this.energy > 0) {

            fill(0, BACKGROUND_COLOUR * 7, 0);
            ellipse(this.x * resolution, this.y * resolution, this.dna.size, this.dna.size);
            fill(this.dna.colour);
            ellipse(this.x * resolution, this.y * resolution, this.dna.size / 1.75, this.dna.size / 1.75);

        } else if (this.energy <= 0 && this.alive) {
            this.die(grid);
            this.alive = false;
        }
    }


    this.move = function () {

        if (this.energy > 0) {

            let c = this.check(grid);
            let r = random(1);

            if (c || r < this.dna.moveRate) {
                this.direction = random(this.directions);
            }

            if (r < this.dna.birthRate) {
                let n = random(1);
                if (n < MUTATION_RATE) {
                    let dna = this.dna.mutate();
                } else {
                    dna = this.dna;
                }

                let snake = new Snake(this.x, this.y, dna);
                snakes.push(snake);
            }

            if (this.direction == "DIR_UP") {
                this.y -= this.speed;
            }
            if (this.direction == "DIR_RIGHT") {
                this.x += this.speed;
            }
            if (this.direction == "DIR_DOWN") {
                this.y += this.speed;
            }
            if (this.direction == "DIR_LEFT") {
                this.x -= this.speed;
            }
            if (this.direction == "DIR_UP_LEFT") {
                this.x -= this.speed;
                this.y -= this.speed;
            }
            if (this.direction == "DIR_UP_RIGHT") {
                this.x += this.speed;
                this.y -= this.speed;
            }
            if (this.direction == "DIR_DOWN_RIGHT") {
                this.x += this.speed;
                this.y += this.speed;
            }
            if (this.direction == "DIR_DOWN_LEFT") {
                this.x -= this.speed;
                this.y += this.speed;
            }

            if (this.x < 0) { this.x = grid.cols }

            if (this.x > grid.cols) { this.x = 0 }

            if (this.y < 0) { this.y = grid.rows }

            if (this.y > grid.rows) { this.y = 0 }

            this.energy -= LOSS_RATE;

        }
    }

    this.check = function (g) {

        for (var i = 0; i < g.matrix.length; i++) {

            for (var j = 0; j < g.matrix[i].length; j++) {

                if (i == this.x && j == this.y) {

                    if (g.matrix[i][j].active) {

                        g.matrix[i][j].active = false;

                        this.energy += NUTRITION;

                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    this.die = function (g) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let r = random(1);
                    if (r < MAX_DEATH_RATE) {
                        let col = (this.x + i + g.cols) % g.cols;
                        let row = (this.y + j + g.rows) % g.rows;
                        g.matrix[col][row].active = true;
                    }
                }
            }
    }
}