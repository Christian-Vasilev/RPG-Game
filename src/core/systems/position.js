import System from "./system.js";

export default class Position extends System {
    constructor() {
        super();

        this.name = 'Position';
    }

    getComponents() {
        return ['Position', 'Renderable'];
    }

    execute(deltaTime, elapsedTime) {

    }
}