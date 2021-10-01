import {isObject} from "./util/helpers.js";
import Manager from "./manager.js";

export default class World {
    /**
     *
     * World component and systems manager
     * @type {Manager}
     */
    #manager = new Manager();

    execute(deltaTime, elapsedTime) {
        const systems = this.#manager.getSystems();
        systems.forEach((system) => {
            system.execute(deltaTime, elapsedTime);
        });
    }

    getManager() {
        return this.#manager;
    }
}