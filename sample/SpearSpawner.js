import { Math, Timer, Vector } from "../dist/index.js";
import { Spear } from "./entities/Spear.js";
import { Game } from "./script.js";

export class SpearSpawner {
    #timer = new Timer(1000);

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.#timer.tick.add(this.#timerontick, this);
        this.#timer.start();
    }

    update() {
        this.#timer.update();
    }

    #timerontick() {
        let spear = new Spear(this.game);
        let direction = this.#rndDirection();
        let placement = this.#placeByDirection(direction);
        spear.position = placement.position;
        spear.angle = placement.angle;
        spear.velocity = direction.multiplied(-0.1);
        this.game.world.add(spear);
    }

    #rndDirection() {
        switch (Math.randInt(0, 3)) {
            case 0:
                return Vector.up
            case 1:
                return Vector.left;
            case 2: 
                return Vector.down;
            default:
                return Vector.right;
        }
    }

    #placeByDirection(direction) {
        let position = this.game.size.divided(2);
        let angle = 0;
        if (direction.equals(Vector.up)) {
            position.y = 0;
            angle = 180;
        }
        else if (direction.equals(Vector.left)) {
            position.x = 0;
            angle = 90;
        }
        else if (direction.equals(Vector.down)) {
            position.y = this.game.height;
            angle = 0;
        }
        else if (direction.equals(Vector.right)) {
            position.x = this.game.width;
            angle = -90;
        }
        return { position, angle }
    }


}