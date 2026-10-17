import { Vector } from "../core/index.js";
import { Control } from "./Control.js";

export class Button extends Control<HTMLButtonElement> {
    size = Vector.zero;
    
    get width() { return this.size.x; }
    set width(value) { this.size.x = value; }
    
    get height() { return this.size.y; }
    set height(value) { this.size.y = value; }
    
    constructor(width: number, height: number) {
        super(document.createElement("button"));
        this.width = width;
        this.height = height;
    }
}