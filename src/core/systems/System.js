    export default class System {
        /**
         * @type {*}
         */
        /**
         *
         * Entities assigned to the system
         */
        #entities = new Set();

        getEntities() {
            return this.#entities;
        }

        hasEntity(entityId) {
            return this.#entities.has(entityId);
        }

        addEntity(entityId) {
            this.#entities.add(entityId);
        }

        /**
         *
         * Check if the entity has a given Controller in it's values
         * @param {*} entityId
         * @param {string} componentName
         */
        hasComponent(components, componentName) {
            return components.findIndex(component => component.name === componentName) !== -1;
        }

        getComponent(components, componentName) {
            return components[components.findIndex(component => component.name === componentName)];
        }
    }