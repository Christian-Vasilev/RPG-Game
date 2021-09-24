import GameEngine from './core/game-engine.js';

export default class Game {
    constructor() {
        this.engine = new GameEngine();
    }

    animate() {
        this.engine.gameLoop(0);
    }
}

const game = new Game();
game.animate();


