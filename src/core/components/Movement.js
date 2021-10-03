export default class Movement {
    constructor(maxSpeed, friction, velocityX, velocityY, rotation) {
        this.name = 'Movement';
        this.state = {
            maxSpeed,
            friction,
            velocityX,
            velocityY,
            rotation: {
                clientX: 0,
                clientY: 0,
            },
        }
    }
}