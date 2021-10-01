export default class System {
    /**
     * @type {*}
     */
    /**
     *
     * Entities assigned to the system
     */
    #entities = new Map();

    constructor() {

    }

    getEntities() {
        return this.#entities;
    }

    setEntities() {

    }

    setEntity(entityId, component) {
        this.#entities.set(entityId, component);
    }
}