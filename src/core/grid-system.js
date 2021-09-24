export default class GridSystem {
    constructor() {
        this.gameContext = this.#getContext(1920, 1080, '#444');
        this.cellSize = 32;
        this.padding = 2;
        this.gridSize = {
            x: 55,
            y: 25,
        }
    }

    getGameContext() {
        return this.gameContext;
    }

    #getContext(width, height, color = "#111", isTransparent = false) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.background = color;

        if (isTransparent) {
            this.canvas.style.background = 'transparent';
        }

        document.body.appendChild(this.canvas);

        this.context.moveTo(0,0);

        return this.context;
    }


    getPositionForDrawing(x, y) {
        let cellSize = this.cellSize + this.padding
        let posX = x * cellSize;
        let posY = y * cellSize;

        return {
            posX,
            posY
        }
    }

    drawOnGrid(x, y) {
        let posX = Math.floor(x / (this.cellSize + this.padding)) * (this.cellSize + this.padding);
        let posY = Math.floor(y / (this.cellSize + this.padding)) * (this.cellSize + this.padding);

        this.gameContext.fillStyle = '#c3c3c3';
        this.gameContext.fillRect(posX, posY, this.cellSize, this.cellSize);
    }

    render() {
        for (let row = 0; row < this.gridSize.x; row++) {
            for (let col = 0; col < this.gridSize.y; col++) {
                this.gameContext.fillStyle = '#0f2d7a';
                this.gameContext.fillRect(
                    row * (this.cellSize + this.padding),
                    col * (this.cellSize + this.padding),
                    this.cellSize,
                    this.cellSize
                );
            }
        }

        this.gameContext.font = "20px Courier";
        this.gameContext.fillStyle = "white";
        this.gameContext.fillText('Grid system working', 20, 30);
    }
}
