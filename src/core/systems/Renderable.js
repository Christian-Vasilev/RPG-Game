import System from "./System.js";

export default class Renderable extends System {
    constructor(width, height, color, context) {
        super();
        this.state = {
            width,
            height,
            color
        }

        this.context = context;
        this.name = 'Renderable';
    }

    getComponents() {
        return ['Position'];
    }

    execute() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.getEntities().forEach((components, entityId) => {
            components.forEach((component) => {
                let { x, y }= component.state;
                this.render(x, y);
            })
        });


    }

    render(x, y ) {
        this.context.save(x, y);

        this.context.beginPath();

        this.context.fillStyle = this.state.color;
        this.context.rect(x, y, this.state.width, this.state.height);
        this.context.fill();

        this.context.closePath();

        this.context.restore();
    }
}