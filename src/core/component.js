export default class Component {
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
            dashDistance: 5,
            dashAmount: 3,
            dashResetTimer:  3 * 1000,
            keyStrokes: new Set(),
        };

        this.dashAmount = this.config.dashAmount;


        this.initEvents();
    }

    initEvents() {
        let { keyStrokes } = this.config;

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key);
            this.useDashAbility();
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key);
        });
    }

    decreaseDashAmount() {
        if (this.dashAmount >= 0) {
            this.dashAmount--;
            let dashTimer = this.config.dashResetTimer * (this.config.dashAmount - this.dashAmount);

            setTimeout(() => {
                console.log('dash increase');
                this.dashAmount++;
            }, dashTimer)
        }
    }

    useDashAbility() {
        if (this.config.keyStrokes.has('Shift')) {
            this.decreaseDashAmount();
        }
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

    spawn() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    draw(x, y) {
        this.context.beginPath();
        this.context.rect(x, y, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    update() {
        this.spawn();
        this.movement();

        this.context.font = "30px Arial";
        this.context.fillText('Dash Amounts: ' + this.dashAmount, 50 , 50);
    }

    movement() {
        let { maxSpeed, friction, keyStrokes } = this.config;

        // Prevent from any logic from below being executed if no buttons are pressed
        if (!keyStrokes.size) {
            return;
        }

        let movement = {
            'ArrowRight': {
                updatePosition: () => {
                    if (this.config.velocityX < maxSpeed) {
                        this.config.velocityX++;
                    }

                    this.config.velocityX *= friction;

                    this.x += this.config.velocityX
                }
            },
            'ArrowLeft': {
                updatePosition: () => {
                    if (this.config.velocityX > -maxSpeed) {
                        this.config.velocityX--;
                    }

                    this.config.velocityX *= friction;

                    this.x += this.config.velocityX
                }
            },
            'ArrowUp': {
                updatePosition: () => {
                    if (this.config.velocityY > -maxSpeed && this.y > 0) {
                        this.config.velocityY--;
                    }

                    this.config.velocityY *= friction;

                    this.y += this.config.velocityY
                }
            },
            'ArrowDown': {
                updatePosition: () => {
                    if (this.config.velocityY < maxSpeed) {
                        this.config.velocityY++;
                    }

                    this.config.velocityY *= friction;

                    this.y += this.config.velocityY
                }
            },
            'Shift': {
                updatePosition: () => {
                    if (keyStrokes.has('Shift') && this.dashAmount >= 0) {
                        let dashDistance = this.config.dashDistance;

                        if (keyStrokes.size >= 3) {
                            dashDistance = 1
                        }

                        if (keyStrokes.has('ArrowDown')) {
                            this.y += this.config.velocityY + dashDistance
                        }

                        if (keyStrokes.has('ArrowUp')) {
                            this.y += this.config.velocityY - dashDistance
                        }

                        if (keyStrokes.has('ArrowRight')) {
                            this.x += this.config.velocityX + dashDistance
                        }

                        if (keyStrokes.has('ArrowLeft')) {
                            this.x += this.config.velocityX - dashDistance
                        }
                    }
                }
            },
        }

        keyStrokes.forEach((keyStroke) => {
            if (movement.hasOwnProperty(keyStroke)) {
                let { updatePosition } = movement[keyStroke];
                updatePosition();
                this.resetIfOutOfBoundaries(this.x, this.y);

                this.draw(this.x, this.y);
            }
        });
    }
}