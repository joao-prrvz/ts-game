import { BaseGame, Vector } from "../core/index.js";
import { Rectangle } from "../shapes/index.js";

export abstract class Control<T extends HTMLElement = HTMLElement> {
    protected root: T;
    protected canvas: HTMLCanvasElement;
    
    text = "";
    fontSize = 12;
    position = Vector.zero;

    constructor(root: T) {
        this.root = root;
        this.root.style.position = "fixed";
        this.canvas = BaseGame.canvas;
    }

    update(deltaTime: number) {
        this.root.textContent = this.text;
        this.#setFontSize();
        this.#setPosition();

    }

    append(element: Control|HTMLElement|null = null) {
        if (element == null)
            document.body.append(this.root);
        else if (element instanceof Control)
            element.root.append(this.root);
        else
            element.append(this.root);
    }

    remove() {
        this.root.remove();
    }

    protected getElementRect(element: HTMLElement) {
        let boundRect = element.getBoundingClientRect();
        let rect = new Rectangle(boundRect.width, boundRect.height);
        rect.position = new Vector(boundRect.x, boundRect.y);
        return rect;
    }

    #setPosition() {
        let canvasRect = this.getElementRect(this.canvas);
        let canvasSize = new Vector(this.canvas.width, this.canvas.height);
        let rootRect = this.getElementRect(this.root);
        
        let ration = canvasSize
            .divided(canvasRect.size);
            
        let position = this.position
            .divided(ration)
            .subtracted(rootRect.size.divided(2))
            .added(canvasRect.position);

        this.root.style.left = `${position.x}px`;
        this.root.style.top = `${position.y}px`;
    }

    #setFontSize() {
        let canvasRect = this.getElementRect(this.canvas);
        let scaleX = canvasRect.size.x / this.canvas.width;
        let  fontSize = Math.round(this.fontSize * scaleX);
        this.root.style.fontSize = `${fontSize}px`;
    }
}