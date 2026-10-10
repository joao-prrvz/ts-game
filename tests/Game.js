import { AnimatedSprite, BaseGame, Circle, GameTime, Rectangle, Shape, Sprite, Timer, Vector } from "../dist/index.js";

let ghost = new AnimatedSprite("./assets/ghost.png", 7, 2);
ghost.add("idle", 0, 6, 8);
ghost.play("idle");
let face = new Sprite("./assets/face.png");
let center = Vector.zero;

export default class Game extends BaseGame {
    constructor() {
        super(document.querySelector("canvas").getContext("2d"));
        center = new Vector(this.ctx.canvas.width / 2);
        ghost.position = face.position.clone(); 
        this.ctx.imageSmoothingEnabled = false;
    }
    
    /**
     * @param {GameTime} gameTime 
    */
    update(gameTime){
        ghost.update(gameTime);
    }


    draw() {
        super.draw();
        Shape.drawRectPro(this.ctx, center, new Vector(30), "fill");
        ghost.draw(this.ctx, center);
        new Rectangle(ghost.height).draw(this.ctx, "stroke", "red", center);
        new Circle(ghost.height).draw(this.ctx, "stroke", "yellow", center);
    }
}

new Game().start();
