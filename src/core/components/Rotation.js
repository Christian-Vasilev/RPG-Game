export default class Rotation {
    constructor(x, y) {
        this.name = 'Rotation';
        this.state = {
            clientX: x,
            clientY: y,
        }
    }
}