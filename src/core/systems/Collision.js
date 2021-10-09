import System from "./System.js";

const playerControlled = 'PlayerControlled';
const position = 'Position';
const collision = 'Collision';

export default class Collision extends System {
    constructor() {
        super();

        this.name = 'Collision';
    }

    getComponents() {
        return [playerControlled, position, collision];
    }

    execute(components) {
        let isControlledByPlayer = this.hasComponent(components, playerControlled);

        if (isControlledByPlayer) {
            let positionComponent = this.getComponent(components, position);
            let collisionComponent = this.getComponent(components, collision);

            let { x, y } = positionComponent.state;
            let {collided, posX, posY } = this.isCollidingWithMap(x, y, collisionComponent.state.boundaries);
            // Check for map collision
            collisionComponent.state.isColliding = collided;
            collisionComponent.state.resetPositionOnCollide = {posX, posY};
        }
    }

    isCollidingWithMap(posX, posY, { leftCollisionX, rightCollisionX, bottomCollisionY, topCollisionY }) {
        let collided = false;

        if (posX < leftCollisionX) {
            posX = leftCollisionX;
            collided = true;
        }

        if (posY < bottomCollisionY) {
            posY = bottomCollisionY;
            collided = true;
        }

        if (posY > topCollisionY) {
            posY = topCollisionY;
            collided = true;
        }

        if (posX > rightCollisionX) {
            posX = rightCollisionX;
            collided = true;
        }

        return {
            posY,
            posX,
            collided
        }
    }

    moveAi() {

    }
}