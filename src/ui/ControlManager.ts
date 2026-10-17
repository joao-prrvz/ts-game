import { ObjectManager } from "../core/index.js";
import type { Control } from "./Control.js";

export class ControlManager extends ObjectManager<Control> {
    update(deltaTime: number) {
        super.update(deltaTime);
        for (const control of this.items)
            control.update(deltaTime);
    }
}