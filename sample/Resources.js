import { ResourceManager, Texture } from "../dist/resources/index.js";

export class Resources extends ResourceManager {
    face = new Texture("./assets/face.png");
    ghost = new Texture("./assets/ghost.png");
    shield = new Texture("./assets/shield.png");
    spear = new Texture("./assets/spear.png");
}