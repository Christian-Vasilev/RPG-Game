import Manager from "./Manager.js";

export default class World {
    /**
     *
     * World component and systems manager
     * @type {Manager}
     */
    #manager = new Manager();

    constructor() {
        this.canvas = null;
        this.context = null;

        this.initCanvas(window.innerWidth, window.innerHeight, '#464047');
    }

    execute() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

        const systems = this.#manager.getSystems();
        systems.forEach((system) => {
            system.getEntities().forEach((entityId) => {
                system.execute(this.#manager.getEntity(entityId));
            })
        });
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
    }

    getManager() {
        return this.#manager;
    }

    getContext() {
        return this.context;
    }
}