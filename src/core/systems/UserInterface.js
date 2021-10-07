import System from "./System.js";

const dash = 'Dash';

export default class UserInterface extends System {
    constructor(context) {
        super();

        this.context = context;
        this.name = 'UserInterface';
    }

    getComponents() {
        return [dash];
    }

    execute(components) {
        let { dashesLeft } = this.getComponent(components, dash).state;

        this.drawDashesLeft(dashesLeft);
    }

    drawDashesLeft(dashesLeft) {
        this.context.font = "30px Arial";
        this.context.fillStyle = '#FFFFFF';
        this.context.fillText('Dash Amounts: ' + dashesLeft, 50 , 50);
    }
}