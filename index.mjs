// import { Cell } from "./cell.mjs";
import { GameWorld } from "./gameworld.mjs";
import { Game } from "./game.mjs";

window.DEBUG = true;

const canvas = document.querySelector("canvas");

const resizer = async () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
}

window.addEventListener("resize", resizer);
resizer();

const canvasContext = canvas.getContext("2d");

if (window.DEBUG) console.log("\n\n\n\nNEW INSTANCE");

const main = async () => {
    const gameWorld = new GameWorld(canvasContext);
    await gameWorld.createGrid();
    await gameWorld.drawCells();

    return new Game(gameWorld, canvas);
}

main().then((GAME) => {
    window.GAME = GAME;
}, console.error);