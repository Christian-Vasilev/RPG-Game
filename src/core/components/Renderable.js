export default class Renderable {
    constructor(width, height, color) {
        this.name = 'Renderable';
        this.state = {
            width,
            height,
            color,
        }
    }
}