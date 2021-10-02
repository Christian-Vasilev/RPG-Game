export default class System {
    /**
     * @type {*}
     */
    /**
     *
     * Entities assigned to the system
     */
    #entities = new Map();

    getEntities() {
        return this.#entities;
    }

    setEntities() {

    }

    getEntity(entityId) {
        let entities = [];
        if (this.#entities.has(entityId)) {
            entities = this.#entities.get(entityId);
        }

        return entities
    }

    setEntity(entityId, component) {
        let entities = this.getEntity(entityId);

        this.#entities.set(entityId, [...entities, component]);
    }

    /**
     *
     * Check if the entity has a given Controller in it's values
     * @param {*} entityId
     * @param {string} componentName
     */
    systemHasComponent(entityId, componentName) {
        return this.getEntity(entityId).findIndex(component => component.name === componentName) !== -1;
    }
}