import System from "./System.js";

const movement = 'Movement';
const playerControlled = 'PlayerControlled';
const rotation = 'Rotation';
const position = 'Position';
const collision = 'Collision';

export default class Movement extends System {
    constructor(leftBoundaries, rightBoundaries) {
        super();

        this.name = 'Movement';
        this.clientX = 0;
        this.clientY = 0;
        this.keyStrokes = new Set();
        this.initEvents();
    }

    initEvents() {
        let keyStrokes = this.keyStrokes;

        // TODO: Find a fix for this to work eve in CO-OP. Right now works only for 1 player
        // Since we keep the coordinates on the system instance.
        window.addEventListener('mousemove', (e) => {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        });

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key.toUpperCase());
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key.toUpperCase());
        });
    }

    getComponents() {
        return [playerControlled, movement, rotation, position, collision];
    }

    execute(components) {
        let isControlledByPlayer = this.hasComponent(components, playerControlled);

        if (isControlledByPlayer) {
            let movementComponent = this.getComponent(components, movement);
            let rotationComponent = this.getComponent(components, rotation);
            let positionComponent = this.getComponent(components, position);
            let collisionComponent = this.getComponent(components, collision);
            let playerMovement = this.movePlayer(movementComponent);

            let { isColliding, resetPositionOnCollide } = collisionComponent.state;
            let { x, y } = positionComponent.state;

            // Calculate rotation of the player
            let calculateRotationDegrees = Math.atan2(
                this.clientY - y,
                this.clientX - x + (Math.PI / 2)
            );

            // Update Components state
            rotationComponent.state = {
                clientX: this.clientX,
                clientY: this.clientY
            }

            // Update Movement component
            movementComponent.state = playerMovement;

            // Update Position component
            positionComponent.state = {
                x: isColliding ? resetPositionOnCollide.posX : x + playerMovement.velocityX,
                y: isColliding ? resetPositionOnCollide.posY : y + playerMovement.velocityY,
                rotation: calculateRotationDegrees
            }
        } else {
            this.moveAi();
        }
    }

    movePlayer(component) {
        let { maxSpeed, friction, velocityX, velocityY } = component.state;

        if (!this.keyStrokes.size) {
            return {
                maxSpeed,
                friction,
                velocityX: 0,
                velocityY: 0,
                rotation: {
                    x: this.clientX,
                    y: this.clientY
                }
            };
        }

        // Reset velocities if there is no diagonal movement
        this.keyStrokes.has('W') && this.keyStrokes.size < 2 && (velocityX = 0);
        this.keyStrokes.has('S') && this.keyStrokes.size < 2 && (velocityX = 0);
        this.keyStrokes.has('A') && this.keyStrokes.size < 2 && (velocityY = 0);
        this.keyStrokes.has('D') && this.keyStrokes.size < 2 && (velocityY = 0);

        if (this.keyStrokes.has('W')) {
            if (velocityY > -maxSpeed) {
                velocityY--;
            }

            velocityY *= friction;
        }

        if (this.keyStrokes.has('A')) {
            if (velocityX > -maxSpeed) {
                velocityX--;
            }

          velocityX *= friction;
        }

        if (this.keyStrokes.has('S')) {
            if (velocityY < maxSpeed) {
                velocityY++;
            }

            velocityY *= friction;
        }

        if (this.keyStrokes.has('D')) {
            if (velocityX < maxSpeed) {
                velocityX++;
            }

            velocityX *= friction;
        }

        return {
            maxSpeed,
            friction,
            velocityX,
            velocityY,
            rotation: {
                clientX: this.clientX,
                clientY: this.clientY
            }
        };
    }

    moveAi() {

    }
}