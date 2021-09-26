export default class Entity {
    constructor(context, width, height, color, x, y) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.config = {
            velocityX: 0,
            velocityY: 0,
            maxSpeed: 5,
            friction: 0.98,
            dashDistance: 50,
            dashAmount: 3,
            rotation: 0,
            timeBetweenDashes: 1.5,
            dashResetTimer:  3 * 1000,
            keyStrokes: new Set(),
        };

        this.rotation = this.config.rotation;

        this.mouseCoordinates = {
            mouseX: this.config.x,
            mouseY: this.config.y,
        }
        this.dashAmount = this.config.dashAmount;
        this.hasAvailableDashes = Boolean(this.dashAmount);
    }

    resetIfOutOfBoundaries(x, y) {
        let leftBoundaries = this.context.canvas.height - this.height;
        let rightBoundaries = this.context.canvas.width - this.width;

        if (y < 0) {
            this.y = 0;
            this.config.velocityY = 0;
        }

        if (y >= leftBoundaries) {
            this.y = leftBoundaries;
            this.config.velocityY = 0;
        }

        if (x < 0) {
            this.x = 0;
            this.config.velocityX = 0;
        }

        if (x >= rightBoundaries) {
            this.x = rightBoundaries;
            this.config.velocityX = 0;
        }
    }

    draw(x, y) {
        this.context.save();
        let translateX = this.x + 0.5 * this.width
        let translateY = this.y + 0.5 * this.height

        this.context.beginPath();

        // Set rotation to the center of the rect.
        this.context.translate(
            translateX,
            translateY
        );

        this.context.rotate(this.rotation);

        // Reset canvas rotation
        this.context.translate(
            -translateX,
            -translateY
        );

        this.context.fillStyle = this.color;
        this.context.rect(x, y, this.width, this.height);
        this.context.fill();
        this.context.closePath();

        this.context.restore();
    }

    update() {
        this.draw(this.x, this.y);
        this.walk();

        this.context.font = "30px Arial";
        this.context.fillText('Dash Amounts: ' + this.dashAmount, 50 , 50);
    }

    movement() {
        let { maxSpeed, friction } = this.config;

        return {
            'D': {
                updatePosition: () => {
                    if (this.config.velocityX < maxSpeed) {
                        this.config.velocityX++;
                    }

                    this.config.velocityX *= friction;

                    this.x += this.config.velocityX
                }
            },
            'A': {
                updatePosition: () => {
                    if (this.config.velocityX > -maxSpeed) {
                        this.config.velocityX--;
                    }

                    this.config.velocityX *= friction;

                    this.x += this.config.velocityX
                }
            },
            'W': {
                updatePosition: () => {
                    if (this.config.velocityY > -maxSpeed && this.y > 0) {
                        this.config.velocityY--;
                    }

                    this.config.velocityY *= friction;

                    this.y += this.config.velocityY
                }
            },
            'S': {
                updatePosition: () => {
                    if (this.config.velocityY < maxSpeed) {
                        this.config.velocityY++;
                    }

                    this.config.velocityY *= friction;

                    this.y += this.config.velocityY
                }
            },
        }
    }

    walk() {
        let { keyStrokes } = this.config;
        console.log(keyStrokes);
        // Prevent from any logic from below being executed if no buttons are pressed
        if (!keyStrokes.size) {
            return;
        }

        let movement = this.movement();

        keyStrokes.forEach((keyStroke) => {
            if (movement.hasOwnProperty(keyStroke)) {
                let { updatePosition } = movement[keyStroke];
                updatePosition();
                this.resetIfOutOfBoundaries(this.x, this.y);
            }
        });
    }
}