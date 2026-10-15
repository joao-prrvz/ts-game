import { EventHandler } from "../core/index.js";

export class Gamepads {

    get pads() { return this.#pads; }

    padConnect = new EventHandler<Gamepads, Gamepad>();
    padDisconnect = new EventHandler<Gamepads, Gamepad>();
    
    #pads: (Gamepad|null)[] = [];

    constructor() {
        window.addEventListener("gamepadconnected", this.#onconnected.bind(this));
        window.addEventListener("gamepaddisconnected", this.#ondisconnected.bind(this));
    }

    update() {
        this.#pads = navigator.getGamepads();
    }

    #onconnected(e: GamepadEvent) {
        this.padConnect.invoke(this, e.gamepad);
    }

    #ondisconnected(e: GamepadEvent) {
        this.padDisconnect.invoke(this, e.gamepad);
    }
}