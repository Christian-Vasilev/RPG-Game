import Entity from "../entity.js";

export default class Character extends Entity {
    constructor(context, width, height, color, x, y) {
        super(context, width, height, color, x, y);

        this.dashAmount = this.config.dashAmount;
        this.canDash = true;
        this.isShiftHeldDown = false;
        this.lastDashedTime = this.config.timeBetweenDashes;
        this.initEvents();
    }

    initEvents() {
        let { keyStrokes } = this.config;

        window.addEventListener('mousemove', (e) => {
            this.rotation = Math.atan2(
                e.clientY - this.y,
                -(e.clientX - this.x),
            );
        });

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key.toUpperCase());
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                this.isShiftHeldDown = false;
                this.dashCooldownTimer();
            }

            keyStrokes.delete(e.key.toUpperCase());
        });
    }

    dashCooldownTimer() {
        this.lastDashedTime++;

        setInterval(this.dashCooldownTimer, 1000);
    }

    useDashAbility() {
        this.canDash = (this.lastDashedTime >= this.config.timeBetweenDashes);

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

        movement.SHIFT = {
            updatePosition: () => {
                if (keyStrokes.has('SHIFT') && this.hasAvailableDashes && this.canDash) {
                    if (this.isShiftHeldDown) {
                        return movement;
                    }

                    let dashDistance = this.config.dashDistance;

                    if (keyStrokes.size >= 3) {
                        dashDistance = 1
                    }

                    if (keyStrokes.has('S')) {
                        this.y += this.config.velocityY + dashDistance
                    }

                    if (keyStrokes.has('W')) {
                        this.y += this.config.velocityY - dashDistance
                    }

                    if (keyStrokes.has('D')) {
                        this.x += this.config.velocityX + dashDistance
                    }

                    if (keyStrokes.has('A')) {
                        this.x += this.config.velocityX - dashDistance
                    }
                }

                this.useDashAbility();
            }
        }

        return movement;
    }

    walk() {
        super.walk();
    }
}