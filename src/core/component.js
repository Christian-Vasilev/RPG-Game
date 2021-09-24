export default class Component {
    constructor(context, width, height, color, x, y) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    getInfo() {
        return [
            this.x,
            this.y,
            this.width,
            this.height,
        ]
    }
}