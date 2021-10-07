import GamEngine from './core/GamEngine.js';

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


