/**
 * @description Represents a dinosaur
 * @constructor
 * @param {string} species
 * @param {string} weight - (lbs) to be compared to human
 * @param {string} height - (in) to be compared to human
 * @param {string} diet  - to be compared to human
 * @param {string} where 
 * @param {string} when 
 * @param {string} fact 
 */
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species,
    this.weight = weight,
    this.height = height,
    this.diet = diet,
    this.where = where,
    this.when = when,
    this.fact = fact,
    /**
     * @description Compares weight of dinosaur to given human
     * @param {*} human - Human object
     * @returns {string} - String to be displayed in the fact line in the infographic
     */
    this.compareWeight = function(human) {
        if (human.weight > this.weight){
            return `${human.name} has ${human.weight - this.weight} lbs on this dino.`;
        }
        return `This dino tips the scales at ${this.weight} lbs.`;
    },
    /**
     * @description Compares height of dinosaur to given human
     * @param {*} human - Human object
     * @returns - String to be displayed in the fact line in the infographic
     */
    this.compareHeight = function(human) {
        if (human.height > this.height) {
            return ``;
        }
        return `${this.species} is ${this.height - human.height} inches taller than you! RUN!`;
    },
    /**
     * @description Compares diet of dinosaur to given human
     * @param {*} human - Human object
     * @returns - String to be displayed in the fact line in the infographic
     */
    this.compareDiet = function(human) {
        let str = '';
        switch (this.diet) {
            case 'omnivor':
                if (human.diet === this.diet) { str = 'Just like you!' }
                else { str = `You can TECHNICALLY share a meal with your ${me.diet} diet...`}
                return `${this.species} eats all the things! ${str}`;
            case 'carnivor':
                return `${this.species} is a carnivor. Run.`;
            case 'herbavor':
                if (human.diet === this.diet) { str = 'You should definitely hit the salad bar together.'}
                else { str = 'Let it eat its salad.' }
                return `${this.species} is an herbavor. ${str}`;
        }
    },
    /**
     * @description Randomly selects a fact to display in the tile
     * @param {*} human - Human object
     * @returns - String to be displayed in the fact line in the infographic
     */
    this.getFact = function(human) {
        // Always display the fact property for the Pigeon tile
        if (this.species === 'Pigeon') { return this.fact; }
        // Return fact string based on random number
        switch(Math.floor( Math.random() * 6 )) {
            case 0:
                return this.compareHeight(human);
            case 1:
                return this.compareWeight(human);
            case 2:
                return this.compareDiet(human);
            case 3:
                return this.fact;
            case 4:
                return `${this.species} roamed in ${this.where}.`;
            case 5:
                return `${this.species} lived during the ${this.when} period.`;
        }
    }
}
/**
 * @description Creates tile html code for 3x3 grid given dinos array and human object.
 * @param {Array} dinos 
 * @param {Human} human 
 * @returns Array strings with html code to append to #grid.
 */
function createTiles(dinos, human) {
    const tiles = [];
    let count = 0;
    // Iterate through dinos json objects and tile html for each Dino and Human object
    dinos.forEach( dino => {
        count++;
        // Create new Dino object from json
        let newDino = new Dino( 
            dino.species
            , dino.weight
            , dino.height
            , dino.diet
            , dino.where
            , dino.when
            , dino.fact );
        // Add tile html to tiles[]
        tiles.push(`
            <div class=grid-item>
                <h3>${newDino.species}</h3>
                <img src='images/${newDino.species.toLowerCase()}.png'>
                <p>${newDino.getFact(human)}</p>
            </div>`);
        // Add Human tile html as 5th element in the grid array
        if (count === 4) {
            tiles.push(`
                <div class=grid-item>
                    <h3>${human.name}</h3>
                    <img src='images/human.png'>
                </div>`);
        }
    });

    return tiles;
}

/**
 * @description on-click callback function for #btn element in the form
 * Creates the human object from the input fields and then removes the form from the DOM.
 * JSON data is retrieved from dino.json, tiles are generated and added to DOM.
 */
$('#btn').on('click', function() {
    // Create human object from input fields using IIFE
    const human = (function() {
        let myName = $('#name').val();
        let feet = $('#feet').val();
        let inches = $('#inches').val();
        let weight = $('#weight').val();
        let diet = $('#diet').val();
        // Return object with height converted to inches for comparison
        return {
            name: myName
          , height: (parseInt(feet) * 12) + parseInt(inches)
          , weight: weight
          , diet: diet
        }
    })();
    // Remove form from DOM
    $('#dino-compare').remove();
    // Fetch json data, create tiles and append to main #grid
    fetch('./dino.json')
    .then(response => response.json())
    .then(json => {
        const tiles = createTiles(json.Dinos, human);
        const grid = $('#grid');
        tiles.forEach(tile => { grid.append(tile) });
    });
});