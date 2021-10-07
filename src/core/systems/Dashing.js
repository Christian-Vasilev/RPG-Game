import System from "./System.js";

const playerControlled = 'PlayerControlled';
const dash = 'Dash';
const position = 'Position';

export default class Dashing extends System {
    constructor() {
        super();

        this.name = 'Dashing';
        this.clientX = 0;
        this.clientY = 0;
        this.keyStrokes = new Set();
        this.initEvents();
    }

    initEvents() {
        let keyStrokes = this.keyStrokes;

        window.addEventListener('keydown', (e) => {
            keyStrokes.add(e.key.toUpperCase());
        });

        window.addEventListener('keyup', (e) => {
            keyStrokes.delete(e.key.toUpperCase());
        });
    }

    getComponents() {
        return [playerControlled, position, dash];
    }

    execute(components) {
        let isControlledByPlayer = this.hasComponent(components, playerControlled);

        if (isControlledByPlayer) {
            let dashComponent = this.getComponent(components, dash);
            let positionComponent = this.getComponent(components, position);

            let { x, y } = positionComponent.state;

            if (this.keyStrokes.has('SHIFT') && this.keyStrokes.size > 1) {
                let dashCurrentState = this.dash(dashComponent);

                dashComponent.state = {...dashComponent.state, ...dashCurrentState}

                if (dashCurrentState.isDashing) {
                    positionComponent.state = {
                        x: x + dashCurrentState.dashX,
                        y: y + dashCurrentState.dashY
                    }
                }
           }
        } else {
            this.moveAi();
        }
    }

    dash(component) {
        let {
            totalDashes,
            dashesLeft,
            canDash,
            lastDashedTime,
            dashDistance,
            timeBetweenDashes,
            dashResetTimer
        } = component.state;

        let response = {
            isDashing: false
        };

        let currentTime = performance.now();
        if (canDash || lastDashedTime !== 0) {
            if (currentTime - lastDashedTime < timeBetweenDashes * 1000) {
                return response;
            }

            if (dashesLeft <= 0) {
                component.state.canDash = false;

                return response;
            }

            --dashesLeft;

            let dashCooldownTimer = dashResetTimer * (totalDashes - dashesLeft);
            lastDashedTime = performance.now();

            setTimeout(() => {
                component.state.canDash = true;
                component.state.dashesLeft++;
            }, dashCooldownTimer);

            return {
                ...this.dashCombinations(dashDistance),
                dashesLeft,
                isDashing: true,
                lastDashedTime
            }
        }

        return response;
    }

    dashCombinations(distance) {
        let dashY = 0;
        let dashX = 0;

        if (this.keyStrokes.has('W')) {
            dashY -= distance;
        }

        if (this.keyStrokes.has('A')) {
            dashX -= distance;
        }

        if (this.keyStrokes.has('S')) {
            dashY += distance;
        }

        if (this.keyStrokes.has('D')) {
            dashX += distance;
        }

        return {
            dashX,
            dashY
        }
    }

    moveAi() {

    }
}