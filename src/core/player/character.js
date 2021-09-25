import Component from "../component.js";

export default class Character extends Component {
    constructor(context, width, height, color, x, y) {
        super(context, width, height, color, x, y);

        this.dashAmount = this.config.dashAmount;
        this.canDash = true;
        this.isShiftHeldDown = false;
        this.lastDashedTime = 2;
        this.timeBetweenDashes = 2;
        this.initEvents();
    }

    initEvents() {
        let { keyStrokes } = this.config;

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key);

            if (keyStrokes.has('Shift')) {
                this.useDashAbility();
            }
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key);

            if (e.key === 'Shift') {
                this.isShiftHeldDown = false;
                this.dashCooldownTimer();
            }
        });
    }

    dashCooldownTimer() {
        this.lastDashedTime++;

        setInterval(this.dashCooldownTimer, 1000);
    }

    useDashAbility() {
        this.canDash = (this.lastDashedTime >= this.timeBetweenDashes);

        if (this.dashAmount > 0 && this.config.keyStrokes.size > 1) {
            if (this.canDash && this.hasAvailableDashes && !this.isShiftHeldDown) {
                this.dashAmount--;
                this.lastDashedTime = 0;
                let dashCooldownTimer = this.config.dashResetTimer * (this.config.dashAmount - this.dashAmount);

                setTimeout(() => {
                    this.dashAmount++;
                    console.log('INCREASE DASH');
                    this.hasAvailableDashes = true;
                }, dashCooldownTimer);
            }
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
                if (keyStrokes.has('Shift') && this.hasAvailableDashes && this.canDash) {
                    let dashDistance = this.config.dashDistance;

                    if (keyStrokes.size >= 3) {
                        dashDistance = 1
                    }

                    if (this.isShiftHeldDown) {
                        return;
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