import {
    isObject,
    isString
} from "./util/helpers.js";

/**
 *
 * The manager is responsible for managing all the entities and their components.
 * Each entity can have multiple components that form the behavior of th entity.
 */
export default class Manager {
    /**
     * Array of System objects
     */
    #systems = new Map();

    /**
     * Array of Entity id's to keep track of them
     */
    #entities = new Map();

    /**
     *
     * @desc Creates a new entity with array of components.
     * @param {array} components
     * @returns {number}
     */
    createEntity(components) {
        const id = (new Date().getTime()) & 0xffffffff; // Generate random 32 bit integer

        components.forEach((component) => {
            let systems = this.syncEntityComponentWithSystems(id, component);

            let entity = this.getEntity(id);
            this.#entities.set(id, [...entity, ...systems]);
        });

        return id;
    }

    /**
     *
     * Attaches a entity and component to a system. This will increase the performance
     * later on when we update the system, since it will iterate only over the components
     * of the system.
     * @param entityId
     * @param component
     */
    syncEntityComponentWithSystems(entityId, component) {
        let entityIncludedSystems = [];

        this.#systems.forEach((system) => {
            // Check if the system components includes the entity component name
            let componentName = component.constructor.name;
            if (system.getComponents().includes(componentName)) {
                // If the Entity component name is included in this system - SYNC.
                system.setEntity(entityId, component);
                if (entityIncludedSystems.indexOf(system) === -1) {
                    entityIncludedSystems.push(system);
                }
            }
        });

        console.log(entityIncludedSystems);

        return entityIncludedSystems;
    }

    /**
     *
     * @desc Retrieves entity with all the components attached to it.
     * @param {number} id
     * @returns {{}|object}
     *
     */
    getEntity(id) {
        if (this.#entities.has(id)) {
            return this.#entities.get(id);
        }

        return [];
    }

    /**
     *
     * @desc Adds a component to already existing entity
     * @param entityId
     * @param component
     * @returns {boolean}
     */
    addComponent(entityId, component) {
        if (!this.#entities.has(entityId)) {
            throw new Error(`There is no entity with id ${entityId}`);
        }

        this.syncEntityComponentWithSystems(entityId, component);

        return true;
    }

    /**
     *
     * @desc Register a system to the world.
     * @param system
     * @returns {boolean}
     */
    registerSystem(system) {
        if (!isObject(system)) {
            throw new Error('System is not an object');
        }

        if (!system.hasOwnProperty('name')) {
            throw new Error('Missing system property name');
        }

        this.#systems.set(system.name, system);

        return true;
    }

    /**
     *
     * Register multiple systems at once
     * @param systems
     * @returns {boolean}
     */
    registerSystems(systems) {
        if (Array.isArray(systems)) {
            systems.forEach((system) => {
                this.registerSystem(system);
            });

            return true;
        }

        return false;
    }

    /**
     *
     * Systems getter
     * @returns {Map<any, any>}
     */
    getSystems() {
        return this.#systems;
    }

    /**
     *
     * @desc Unregister a system from the world.
     * @param system
     * @returns {boolean}
     */
    unregisterSystem(system) {
        if (!isString(system)) {
            return false;
        }

        if (!this.systems.has(system)) {
            return false;
        }

        this.systems.delete(system);

        return true;
    }
}