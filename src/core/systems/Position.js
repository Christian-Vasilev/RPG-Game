import System from "./System.js";

const playerController = 'PlayerControlled';
const position = 'Position';

export default class Position extends System {
    constructor() {
        super();

        this.name = 'Position';
    }

    getComponents() {
        return [position, playerController];
    }

    execute() {
        this.getEntities().forEach((components, entityId) => {
            let isControlledByPlayer = this.systemHasComponent(entityId, playerController);

            if (isControlledByPlayer) {
                this.movePlayer();
            } else {
                this.moveAi();
            }
        });
    }

    movePlayer() {

    }

    moveAi() {

    }
}