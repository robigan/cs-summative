class Cell {
    // Set the size for each cell
    static width = 10;
    static height = 10;

    #context;
    gridX;
    gridY;

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {number} gridX 
     * @param {number} gridY 
     */
    constructor(context, gridX, gridY) {
        this.#context = context;

        // Store the position of this cell in the grid
        this.gridX = gridX;
        this.gridY = gridY;

        // Make random squares alive
        this.alive = Math.random() > 0.75;
    }

    draw() {
        // Draw a square, let the state determine the color
        this.#context.fillStyle = this.alive?'#303030':'#ffffff';
        this.#context.fillRect(this.gridX, this.gridY, Cell.width, Cell.height);
    }
}

export { Cell }