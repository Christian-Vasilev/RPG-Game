
export default class HealthBar {
    constructor(x, y, width, height, maxHealth, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxWidth = width;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.color = color;
    }

    show(context) {
        context.strokeStyle = "#333";
        context.lineWidth = 3;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.maxWidth, this.height);
    }

    updateHealth(health) {
        this.health = health;

        if (this.health >= 0) {
            this.width = (this.health / this.maxHealth) * this.maxWidth;
        }
    }

    getHealth() {
        return this.health;
    }
}