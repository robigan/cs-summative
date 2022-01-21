import { Cell } from "./cell.mjs";
import { GameWorld } from "./gameworld.mjs";

class Game {
    #gameWorld;
    #context;
    #canvas;

    /**
     * @param {GameWorld} gameWorld 
     * @param {HTMLCanvasElement} canvas
     */
    constructor(gameWorld, canvas) {
        this.#gameWorld = gameWorld;
        this.#context = this.#gameWorld.context;
        this.#canvas = canvas;

        document.body.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                window.requestAnimationFrame(() => this.gameLoop());
            }
        });

        document.body.addEventListener("mousedown", (event) => this.toggleCell(event));

        // if (window.DEBUG) {
        //     document.body.addEventListener("mousedown", async (event) => {
        //         if (event.shiftKey) {
        //             const target = await this.getCursorPosition(event);
        //             if (target !== undefined) target.toggleDebugState();
        //             console.debug(target);
        //         }    
        //     });
        // }
    }

    async gameLoop() {
        // Check the surrounding of each cell
        this.#gameWorld.checkCells();
    
        // Clear the screen
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
        // Draw all the game objects
        await this.#gameWorld.drawCells();
    }

    /**
     * @param {MouseEvent} event 
     * @returns {(Cell | undefined)}
     */
    async getCursorPosition(event) {
        const rect = this.#canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / 10) * 10;
        const y = Math.floor((event.clientY - rect.top) / 10) * 10;
        
        const cell = this.#gameWorld.gridToCell(x, y);

        return cell;
    }

    /**
     * @param {MouseEvent} event 
     */
    async toggleCell(event) {
        const cell = await this.getCursorPosition(event);

        if (cell === undefined) return;

        if (event.shiftKey && window.DEBUG) {
            cell.toggleDebugState();
            console.debug(cell);
        } else {
            cell.setState(!cell.alive);
        }

        cell.draw();
    }
}

export { Game }