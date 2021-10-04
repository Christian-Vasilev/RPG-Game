import System from "./System.js";

const renderable = 'Renderable';
const position = 'Position';

export default class Renderable extends System {
    constructor(context) {
        super();

        this.context = context;
        this.name = 'Renderable';
    }

    getComponents() {
        return [position, renderable];
    }

    execute(components) {
        let { width, height, color } = this.getComponent(components, renderable).state;
        let { x, y, rotation } = this.getComponent(components, position).state;

        this.render(x, y, rotation, width, height, color);
    }

    render(x, y, rotation, width, height, color) {
        this.context.save(x, y);

        // Translate element
        let translateX = x + 0.5 * width
        let translateY = y + 0.5 * height

        // Rotate element with translation
        this.context.translate(
            translateX,
            translateY
        );

        this.context.rotate(rotation);

        // Reset canvas rotation
        this.context.translate(
            -translateX,
            -translateY
        );

        this.context.beginPath();

        this.context.fillStyle = color;
        this.context.rect(x, y, width, height);
        this.context.fill();

        this.context.closePath();

        this.context.restore();
    }
}