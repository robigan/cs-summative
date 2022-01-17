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

new Game(new GameWorld(canvasContext), canvas);
// gameWorld.createGrid();
// gameWorld.drawCells();