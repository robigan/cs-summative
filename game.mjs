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

        window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        // Check the surrounding of each cell
        // this.checkSurrounding();
    
        // Clear the screen
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
        // Draw all the game objects
        this.#gameWorld.drawCells();
    
        // The loop function has reached it's end, keep requesting new frames
        setTimeout( () => {
            window.requestAnimationFrame(this.gameLoop);
        }, 1000) // The delay will make the game easier to follow
    }
}

export { Game }