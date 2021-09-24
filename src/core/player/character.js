import Component from "../component.js";

export default class Character extends Component {
    constructor(context, width, height, color, x, y) {
        super(context, width, height, color, x, y);
        this.config = {
            velocityX: 0,
            velocityY: 0,
            maxSpeed: 5,
            friction: 0.98,
            keyStrokes: new Set(),
        };

        this.initEvents();
    }

    initEvents() {
        let { keyStrokes } = this.config;

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key);
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key);
        });
    }

    spawn() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    draw(x, y) {
        this.context.fillStyle = this.color;
        this.context.fillRect(x, y, this.width, this.height);
    }

    update() {
        this.spawn();
        this.movement();
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
        }

        keyStrokes.forEach((keyStroke) => {
            if (keyStrokes.has(keyStroke)) {
                let {updatePosition } = movement[keyStroke];
                updatePosition();
                this.resetIfOutOfBoundaries(this.x, this.y);

                this.draw(this.x, this.y);
            }
        });
    }
}