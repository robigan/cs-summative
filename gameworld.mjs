import { Cell } from "./cell.mjs";

class GameWorld {
    static numRows = 20;
    static numColumns = 20;

    #init = false;
    /**
     * @type {Cell[]}
     */
    #gameCells = [];
    context;

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context;
        // this.#gameCells = [];
    }

    async createGrid() {
        if (this.#init === true) throw new Error("GameWorld already init")
        this.#init = true;
        for (let y = 0; y < GameWorld.numRows * Cell.height; y += Cell.height) {
            for (let x = 0; x < GameWorld.numColumns * Cell.width; x += Cell.width) {
                // this.context.rect(x, y, Cell.width, Cell.height)
                this.#gameCells.push(new Cell(this.context, x, y));
            }
        }
    }

    async drawCells() {
        for (const cell of this.#gameCells) {
            await cell.draw();
        }
    }

    async checkCells() {
        for (const cell of this.#gameCells) {
            const x = cell.gridX;
            const y = cell.gridY;

            const states = [
                this.gridToAlive(x - Cell.width, y - Cell.height),
                this.gridToAlive(x, y - Cell.height), 
                this.gridToAlive(x + Cell.width, y - Cell.height), 
                this.gridToAlive(x - Cell.width, y), 
                this.gridToAlive(x + Cell.width, y), 
                this.gridToAlive(x - Cell.width, y + Cell.height), 
                this.gridToAlive(x, y + Cell.height), 
                this.gridToAlive(x + Cell.width, y + Cell.height)
            ]

            cell.determineState(/* [true, true, false, false, false, false, false, false] */states);
        }
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    gridToAlive(x, y) {
        if (x < 0 || x >= GameWorld.numColumns * Cell.width || y < 0 || y >= GameWorld.numRows * Cell.height){
            return false;
        }    

        return this.gridToCell(x, y).alive;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    gridToCell(x, y) {
        return this.#gameCells[this.gridToIndex(x, y)];
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    gridToIndex(x, y) {
        return (x / Cell.width) + ((y / Cell.height) * GameWorld.numColumns);
    }
}

export { GameWorld }