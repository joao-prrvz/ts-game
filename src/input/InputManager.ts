import Vector from "../core/Vector.js";

export default class InputManager {
    static get mousePosition() { 
        let position =  this.globalMousePosition;
        let boundRect = this.#canvas.getBoundingClientRect();
        let canvasPos = new Vector(boundRect.x, boundRect.y);
        let boundRectSize = new Vector(boundRect.width, boundRect.height);
        let canvasSize = new Vector(this.#canvas.width, this.#canvas.height);
        position.subtract(canvasPos);
        position.x *= canvasSize.x / boundRectSize.x;
        position.y *= canvasSize.y / boundRectSize.y;
        return position;
    }

    static get globalMousePosition() { return this.#mousePositon.clone(); }

    static get mouseDown() { return this.#mouseDown; }

    static #canvas: HTMLCanvasElement;
    static #keys = new Set<string>();
    static #previousKeys: string[] = [];
    static #currentKeys: string[] = [];

    static #mousePositon = Vector.zero;
    static #mouseDown = false;
    static #mouseButtons = new Set<number>();

    static initialize(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        window.addEventListener("keydown", this.#onkeydown.bind(this));
        window.addEventListener("keyup", this.#onkeyup.bind(this));
        window.addEventListener("mousemove", this.#onmousemove.bind(this));
        window.addEventListener("mousedown", this.#onmousedown.bind(this));
        window.addEventListener("mouseup", this.#onmouseup.bind(this));
    }

    static update() {
        this.#previousKeys = this.#currentKeys;
        this.#currentKeys = [...this.#keys];
    }

    static isDown(key: string) {
        return this.#currentKeys.includes(key);
    }

    static isJustPressed(key: string) {
        return this.isDown(key) && !this.#previousKeys.includes(key);
    }
    
    static #onkeydown(e: KeyboardEvent) {
        this.#keys.add(e.key);
    }

    static #onkeyup(e: KeyboardEvent) {
        this.#keys.delete(e.key)
    }

    static #onmousemove(e: MouseEvent) {
        this.#mousePositon.x = e.x;
        this.#mousePositon.y = e.y;
    }

    static #onmousedown(e: MouseEvent) {
        this.#mouseDown = true;
    }

    static #onmouseup(e: MouseEvent) {
        this.#mouseDown = false;
        e.button
    }
}
