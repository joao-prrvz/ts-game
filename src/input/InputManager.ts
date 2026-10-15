import { Keyboard } from "./Keyboard.js";
import { Mouse } from "./Mouse.js";

export class InputManager {
    
    static get keyboard() { return this.#keyboard; }
    static get mouse() { return this.#mouse; }

    static #keyboard: Keyboard;
    static #mouse: Mouse;

    static initialize(canvas: HTMLCanvasElement) {
        this.#keyboard = new Keyboard();
        this.#mouse = new Mouse(canvas);
       
    }

    static update() {
        this.keyboard.update()
        this.mouse.update();
    }
}
