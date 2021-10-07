export default class Dash {
    constructor(totalDashes, dashDistance, timeBetweenDashes, dashResetTimer) {
        this.name = 'Dash';
        this.state = {
            totalDashes,
            dashesLeft: totalDashes,
            dashDistance,
            timeBetweenDashes,
            dashResetTimer,
            isDashing: false,
            dashCooldown: false,
            canDash: true,
            lastDashedTime: 0,
        }
    }
}