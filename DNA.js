function DNA() {

    this.moveRate = random(MAX_MOVE_RATE);
    this.birthRate = random(MAX_BIRTH_RATE);
    this.energy = random(MAX_ENERGY);

    this.size = random(resolution / 2, resolution);
    this.colour = color(random(150), BACKGROUND_COLOUR, random(150));

    this.mutate = function () {
        console.log("Mutation!");
        let dna = new DNA();

        dna.moveRate = this.moveRate;
        dna.birthRate = this.birthRate;
        dna.energy = floor(random(this.energy - 10, this.energy + 10));

        dna.colour.setRed(random(this.colour.red - 10, this.colour.red + 10));
        dna.colour.setGreen(random(this.colour.green - 10, this.colour.green + 10));
        dna.colour.setBlue(random(this.colour.blue - 10, this.colour.blue + 10));
        dna.size = random(resolution / 2, resolution);
        return dna;
    }
}