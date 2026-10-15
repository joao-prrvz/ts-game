import { Vector } from "../core/index.js";
import type { MouseButton } from "./MouseButton.js";

export class Mouse {

    get globalPosition() { return this.#gobalPosition; }
    get down() { return this.#down; }

    get position() {
        let position = this.globalPosition.clone();
        let boundRect = this.#canvas.getBoundingClientRect();
        let canvasPos = new Vector(boundRect.x, boundRect.y);
        let boundRectSize = new Vector(boundRect.width, boundRect.height);
        let canvasSize = new Vector(this.#canvas.width, this.#canvas.height);
        position.subtract(canvasPos);
        position.x *= canvasSize.x / boundRectSize.x;
        position.y *= canvasSize.y / boundRectSize.y;
        return position;
    }
    
    #canvas: HTMLCanvasElement;
    #gobalPosition = Vector.zero;
    #down = false;

    #buttons = new Set<MouseButton>();
    #previousButtons: MouseButton[] = [];
    #currentButtons: MouseButton[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        window.addEventListener("mousemove", this.#onmousemove.bind(this));
        window.addEventListener("mousedown", this.#onmousedown.bind(this));
        window.addEventListener("mouseup", this.#onmouseup.bind(this));
    }

    update() {
        this.#previousButtons = this.#currentButtons;
        this.#currentButtons = [...this.#buttons];
    }

    isDown(button: MouseButton) {
        return this.#currentButtons.includes(button);
    }

    isJustPressed(button: MouseButton) {
        return this.isDown(button) && !this.#previousButtons.includes(button);
    }

    #onmousemove(e: MouseEvent) {
        this.#gobalPosition.x = e.x;
        this.#gobalPosition.y = e.y;
    }

    #onmousedown(e: MouseEvent) {
        this.#down = true;
    }

    #onmouseup(e: MouseEvent) {
        this.#down = false;
        this.#buttons.add(e.button as MouseButton);
    }

    
}