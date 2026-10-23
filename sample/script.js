import { BaseGame, World, ControlManager, Label } from "../dist/index.js";
import { Resources } from "./Resources.js";
import { SpearSpawner } from "./SpearSpawner.js";
import { Ghost } from "./entities/Ghost.js";


export class Game extends BaseGame {
    world = new World();
    controlManager = new ControlManager(); 
    resources = new Resources();
    score = 0;
    #lblScore = new Label();
    #lblHp = new Label();
    #controlManager = new ControlManager();

    constructor() {
        super(document.querySelector("canvas").getContext("2d"));
        this.scaleUp();
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;
        this.player = new Ghost(this, this.size.divided(2));
        this.spearSpawner = new SpearSpawner(this);
        this.#lblScore.append();
        this.#lblHp.append();
        this.#controlManager.add(this.#lblScore, this.#lblHp);
        this.world.add(this.player);
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        super.update(deltaTime);
        this.world.update(deltaTime);
        this.spearSpawner.update();
        this.#lblScore.text = this.score;
        this.#lblHp.text = this.player.hp;
        this.#lblScore.position.x = 10;
        this.#lblHp.position.x = 50;
        this.#controlManager.update(deltaTime);
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