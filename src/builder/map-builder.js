let canvas = document.querySelector("canvas");
let tilesetContainer = document.querySelector(".tileset-container");
let tilesetSelection = document.querySelector(".tileset-container_selection");
let tilesetImage = document.querySelector("#tileset-source");

let selection = [0, 0]; //Which tile we will paint from the menu

let isMouseDown = false;
let currentLayer = 0;

let layers = [
    //Bottom
    {
        //Structure is "x-y": ["tileset_x", "tileset_y"]
        //EXAMPLE: "1-1": [3, 4],
        "1-1": [0,0],
    },
    //Middle
    {},
    //Top
    {}
];

function draw() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);

    let sizeOfCrop = 32;
}

tilesetImage.onload = function () {

}

tilesetImage.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png";
