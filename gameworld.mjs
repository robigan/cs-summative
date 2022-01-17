import { Cell } from "./cell.mjs";

class GameWorld {
    static numRows = 20;
    static numColumns = 20;

    #init = false;
    gameCells = [];
    context;

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context;
        // this.#gameCells = [];
    }

    createGrid() {
        if (this.#init === true) throw new Error("GameWorld already init")
        this.#init = true;
        for (let y = 0; y < GameWorld.numRows * Cell.width; y += Cell.width) {
            for (let x = 0; x < GameWorld.numColumns * Cell.height; x += Cell.height) {
                // this.context.rect(x, y, Cell.width, Cell.height)
                this.gameCells.push(new Cell(this.context, x, y));
            }
        }
    }

    drawCells() {
        for (const cell of this.gameCells) {
            cell.draw();
        }
    }
}

export { GameWorld }