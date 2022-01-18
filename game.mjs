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

        // if
    }

    async gameLoop() {
        // Check the surrounding of each cell
        this.#gameWorld.checkCells();
    
        // Clear the screen
        // console.log(this)
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
        // Draw all the game objects
        await this.#gameWorld.drawCells();
    
        // The loop function has reached it's end, keep requesting new frames
        // setTimeout( () => {
        //     window.requestAnimationFrame(() => this.gameLoop());
        // }, 1000) // The delay will make the game easier to follow
    }
}

export { Game }