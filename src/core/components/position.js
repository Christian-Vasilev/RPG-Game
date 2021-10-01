export default class Position {
    constructor(x, y, rotation) {
        this.name = 'Position';
        this.state = {
            x,
            y,
            rotation,
        }
    }
}