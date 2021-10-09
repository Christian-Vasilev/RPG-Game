import GamEngine from './core/GamEngine.js';
import css from "./css/style.css";

export default class Game {
    constructor() {
        this.engine = new GamEngine();
    }

    animate() {
        this.engine.gameLoop(0);
    }
}

const game = new Game();
game.animate();



