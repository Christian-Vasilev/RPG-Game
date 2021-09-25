import Component from "../component.js";

export default class Character extends Component {
    constructor(context, width, height, color, x, y) {
        super(context, width, height, color, x, y);

        this.isShiftPressed = false;
        this.initEvents();
    }

    initEvents() {
        let { keyStrokes } = this.config;

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key);

            if (keyStrokes.has('Shift') && !this.isShiftPressed) {
                this.useDashAbility();
            }
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key);

            if (e.key === 'Shift') {
                this.isShiftPressed = false;
            }
        });
    }

    useDashAbility() {
        if (this.dashAmount > 0 && this.hasAvailableDashes && this.config.keyStrokes.size > 1) {
            this.decreaseDashAmount();
            let dashTimer = this.config.dashResetTimer * (this.config.dashAmount - this.dashAmount);
            this.isShiftPressed = true;

            setTimeout(() => {
                this.dashAmount++;
                this.hasAvailableDashes = true;
            }, dashTimer)
        } else {
            this.hasAvailableDashes = false;
            this.dashAmount = 0;
        }
    }

    movement() {
        let { keyStrokes } = this.config;
        let movement = super.movement();

        movement.Shift = {
            updatePosition: () => {
                if (keyStrokes.has('Shift') && this.hasAvailableDashes && !this.isShiftPressed) {
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
        }

        return movement;
    }

    walk() {
        super.walk();
    }
}