import System from "./System.js";

const movement = 'Movement';
const playerControlled = 'PlayerControlled';
const rotation = 'Rotation';
const position = 'Position';

export default class Movement extends System {
    constructor() {
        super();

        this.name = 'Movement';
        this.clientX = 0;
        this.clientY = 0;
        this.keyStrokes = new Set();
        this.initEvents();
    }

    initEvents() {
        let keyStrokes = this.keyStrokes;

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
        return [playerControlled, movement, rotation, position];
    }

    execute() {
        this.getEntities().forEach((components, entityId) => {
            let isControlledByPlayer = this.hasComponent(entityId, playerControlled);

            if (isControlledByPlayer) {
                let movementComponent = this.getComponent(entityId, movement);
                let rotationComponent = this.getComponent(entityId, rotation);
                let positionComponent = this.getComponent(entityId, position);
                let playerMovement = this.movePlayer(movementComponent);

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
                    x: x + playerMovement.velocityX,
                    y: y + playerMovement.velocityY,
                    rotation: calculateRotationDegrees
                }
            } else {
                this.moveAi();
            }
        });
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