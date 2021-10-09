export default class Collision {
    constructor(leftCollisionX, rightCollisionX, bottomCollisionY, topCollisionY) {
        this.name = 'Collision';
        this.state = {
            isColliding: false,
            boundaries: {
                leftCollisionX,
                rightCollisionX,
                bottomCollisionY,
                topCollisionY
            },
            resetPositionOnCollide: {
                posX: 0,
                posY: 0
            }
        }
    }
}