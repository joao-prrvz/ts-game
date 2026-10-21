import { BaseGame } from "../dist/BaseGame.js";
import { Vector, Button, World, Collider, InputManager, ControlManager, Label, Circle } from "../dist/index.js";
import { Resources } from "./Resources.js";
import { Ghost } from "./entities/Ghost.js";


export class Game extends BaseGame {
    world = new World();
    controlManager = new ControlManager(); 
    resources = new Resources();
    coll = new Collider(new Circle(10));

    constructor() {
        super(document.querySelector("canvas").getContext("2d"));
        this.scaleUp();
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;
        this.player = new Ghost(this, this.size.divided(2));
        this.coll.collisionType = "transparent";
        this.coll.bodyEnter.add(() => {
            console.log("enter")
            this.player.shape.style = "fill";
        }
        );
        this.coll.bodyLeave.add(() =>  {
            console.log("leave")
            this.player.shape.style = "stroke";
        }
        );
        this.world.add(this.player, this.coll);
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        super.update(deltaTime);
        this.coll.position = InputManager.mouse.position;
        this.world.update(deltaTime);
        
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        super.draw(ctx);
        this.world.draw(ctx);
    }

}

const game = new Game();
game.start();