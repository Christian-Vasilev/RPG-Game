import System from "./system.js";

export default class Renderable extends System {
    constructor() {
        super();

        this.name = 'Renderable';
    }

    getComponents() {
        return ['Renderable'];
    }

    execute(deltaTime, elapsedTime) {

    }
}