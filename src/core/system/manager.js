/**
 *
 * The manager is responsible for managing all the entities and their components.
 * Each entity can have multiple components that form the behavior of th entity.
 */
export default class Manager {
    constructor() {
        /**
         * Array of Entity objects
         */
        this.entities = new Map();
    }

    /**
     *
     * @desc Creates a new entity with array of components.
     * @param {array} components
     * @returns {number}
     */
    createEntity(components) {
        const id = (new Date().getTime()) & 0xffffffff; // Generate random 32 bit integer

        let mappedComponents = [];
        components.forEach((component) => {
            mappedComponents.push({
                [component.name]: component,
            })
        });

        this.entities.set(id, mappedComponents);

        return id;
    }

    /**
     *
     * @desc Retrieves entity with all the components attached to it.
     * @param {number} id
     * @returns {{}|object}
     *
     */
    getEntity(id) {
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }

        return {};
    }

    /**
     * @desc Adds a component to already existing entity
     * @param entityId
     * @param component
     * @returns {boolean}
     */
    addComponent(entityId, component) {
        if (!this.entities.has(entityId)) {
            return false;
        }

        let entities = this.entities.get(entityId);

        entities.push({
            [component.name]: component,
        });

        this.entities.set(entityId, entities);

        return true;
    }
}