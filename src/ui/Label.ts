import { Control } from "./Control.js";

export class Label extends Control<HTMLParagraphElement> {

    constructor() {
        super(document.createElement("p"));
        this.root.style.fontSize = "24px";
    }
}