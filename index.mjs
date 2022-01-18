// import { Cell } from "./cell.mjs";
import { GameWorld } from "./gameworld.mjs";
import { Game } from "./game.mjs";

const canvas = document.querySelector("canvas");

const resizer = async () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
}

window.addEventListener("resize", resizer);
resizer();

const canvasContext = canvas.getContext("2d");

// const testCell = new Cell(canvasContext, 10, 10);
// testCell.draw();

console.log("\n\n\n\nNEW INSTANCE");

(async () => {
    const gameWorld = new GameWorld(canvasContext);
    await gameWorld.createGrid();
    new Game(gameWorld, canvas);
})().catch(console.error);
// gameWorld.createGrid();
// gameWorld.drawCells();