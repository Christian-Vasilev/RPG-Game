import GridSystem from './gridSystem.js';
import HealthBar from "./player/health-bar.js";
import Character from "./player/character.js";
import Manager from "./manager.js";
import Position from "./components/position.js";
import PositionSystem from "./systems/position.js";
import World from "./world.js";
import Renderable from "./components/renderable.js";
import RenderableSystem from "./systems/renderable.js";
let timeToNextRender = 0;
let lastTime = 0;

export default class GamEngine {
    constructor() {
        // Create a new world instance
        const gameWorld = new World();
        // Get the world manager
        const gameWorldManager = gameWorld.getManager();
        // Add a system to the world manager
        gameWorldManager.registerSystem(new PositionSystem());
        gameWorldManager.registerSystem(new RenderableSystem());

        // Add a player Entity to the world manager.
        let playerEntityId = gameWorldManager.createEntity([
            new Position(20, 30, 0),
            new Renderable('#FFFFFF')
        ]);

        console.log(gameWorld);

        return;
        this.gridSystem = new GridSystem();
        this.canvas = null;
        this.context = null;
        this.deltaTime = 0;
        this.gameConfig = {
            fps: 60,
            frameDuration: 1000 / 60,
        }
        this.initCanvas(window.innerWidth, window.innerHeight, '#464047');
        this.character = new Character(this.context, 32, 32, 'white', 130, 130);

        // this.gameContext = this.gridSystem.getGameContext();
        // this.healthBar = new HealthBar(20, 20, 200, 30, 100, 'green');
        //
        //
        // this.gameContext.canvas.onclick = (e) => {
        //     let {x, y} = this.gameContext.canvas.getBoundingClientRect();
        //     let mouseY = e.clientY - x;
        //     let mouseX = e.clientX - y;
        //     this.gridSystem.drawOnGrid(mouseX, mouseY);
        // }
    }

    initCanvas(width, height, color) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.background = color;

        document.body.appendChild(this.canvas);

        this.context.moveTo(0,0);

        return this.context;
    }

    gameLoop = (timestamp) => {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        timeToNextRender += deltaTime;

        if (timeToNextRender > this.gameConfig.frameDuration) {
            this.update();
            timeToNextRender = 0;
        }

        let actualFps = 1000 / deltaTime;
        // console.log(
        //     'Actual FPS: ' + actualFps,
        //     'Milliseconds: ' + deltaTime,
        // );

        requestAnimationFrame(this.gameLoop);
    }

    update() {
        // Calculate the delta time
        // let delta = this.calculateDeltaTime();
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        // this.healthBar.show(this.uiContext);

        this.character.update();
    }
}

