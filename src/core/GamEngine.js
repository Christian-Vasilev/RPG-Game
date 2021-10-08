import GridSystem from './gridSystem.js';
import HealthBar from "./player/health-bar.js";
import Character from "./player/character.js";
import Manager from "./Manager.js";
import Position from "./components/Position.js";
import World from "./World.js";
import RenderableSystem from "./systems/Renderable.js";
import PlayerControlled from "./components/PlayerControlled.js";
import Movement from "./components/Movement.js";
import MovementSystem from "./systems/Movement.js";
import Renderable from "./components/Renderable.js";
import Rotation from "./components/Rotation.js";
import Dash from "./components/Dash.js";
import DashingSystem from "./systems/Dashing.js";
import UserInterface from "./systems/UserInterface.js";

let lastFpsUpdate = 0;
let framesThisSecond = 0;
let deltaTime = 0;
let fps = 0;
let lastFrameTimeMs = 0;
let timeStep = 1000 / 60;

export default class GamEngine {
    #gameWorld = new World();

    #gameWorldManager = this.#gameWorld.getManager();

    constructor() {
        this.gameConfig = {
            fps: 60,
            frameDuration: 1000 / 60,
        }

        const context = this.#gameWorld.getContext()

        this.#gameWorldManager.registerSystems([
            new MovementSystem(context.canvas.height, context.canvas.width),
            new DashingSystem(),
            new RenderableSystem(context),
            new UserInterface(context)
        ]);

        // Add a player Entity to the world manager.
        this.#gameWorldManager.createEntity([
            new PlayerControlled(),
            new Movement(4, 0.9, 0, 0, 0),
            new Rotation(0, 0),
            new Dash(3, 50, 1.5, 3 * 1000),
            new Position(150, 130, 0),
            new Renderable(32, 32, '#FFFFFF')
        ]);


        // this.gridSystem = new GridSystem();
        // this.canvas = null;
        // this.context = null;
        // this.deltaTime = 0;

        // this.character = new Character(this.context, 32, 32, 'white', 130, 130);

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

    gameLoop = (timestamp) => {
        // Throttle the frame rate.
        if (timestamp < lastFrameTimeMs + (1000 / this.gameConfig.fps)) {
            requestAnimationFrame(this.gameLoop);
            return;
        }
        deltaTime += timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        if (timestamp > lastFpsUpdate + 1000) {
            fps = 0.25 * framesThisSecond + 0.75 * fps;

            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
        }
        framesThisSecond++;

        let numUpdateSteps = 0;
        while (deltaTime >= timeStep) {
            this.#gameWorld.execute();
            deltaTime -= timeStep;
            if (++numUpdateSteps >= 240) {
                deltaTime = 0;
                break;
            }
        }

        requestAnimationFrame(this.gameLoop);


        // console.log(Math.round(fps));
        //
        //
        // let deltaTime = timestamp - lastTime;
        // lastTime = timestamp;
        // timeToNextRender += deltaTime;
        //
        // if (timeToNextRender > this.gameConfig.frameDuration) {
        //     this.#gameWorld.execute();
        //     timeToNextRender = 0;
        // }
        //
        // let actualFps = 1000 / deltaTime;
        // console.log(
        //     'Actual FPS: ' + actualFps,
        //     'Milliseconds: ' + deltaTime,
        // );

    }
}

