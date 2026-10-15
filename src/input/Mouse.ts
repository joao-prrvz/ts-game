import { Vector } from "../core/index.js";

export class Mouse {
    get globalPosition() { return this.#gobalPosition; }
    get down() { return this.#down; }
    
    #canvas: HTMLCanvasElement;
    #gobalPosition = Vector.zero;
    #down = false;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        window.addEventListener("mousemove", this.#onmousemove.bind(this));
        window.addEventListener("mousedown", this.#onmousedown.bind(this));
        window.addEventListener("mouseup", this.#onmouseup.bind(this));
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
        e.button
    }

    
}