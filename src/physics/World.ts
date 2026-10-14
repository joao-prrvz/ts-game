import type GameTime from "../core/GameTime.js";
import type Vector from "../core/Vector.js";
import Circle from "../shapes/Circle.js";
import Rectangle from "../shapes/Rectangle.js";
import Collider from "./Collider.js";
import Collisions from "./Collisions.js";

export default class World {
    #colliders = new Set<Collider>();
    #collidersToRemove = new Set<Collider>();
    #collidersToAdd = new Set<Collider>();
    #collidersArray: Collider[] = [];

    add(...colliders: Collider[]) {
        for (const collider of colliders) {
            this.#collidersToAdd.add(collider);
            this.#collidersToRemove.delete(collider);
        }
    }

    remove(...colliders: Collider[]) {
        for (const collider of colliders) {
            this.#collidersToRemove.add(collider);
            this.#collidersToAdd.delete(collider);
        }
    }

    update(gameTime: GameTime) {
        for (const collider of this.#collidersToAdd)
            this.#colliders.add(collider);
        this.#collidersToAdd.clear();

        for (const collider of this.#colliders) {
            if (this.#collidersToRemove.has(collider))
                this.#colliders.delete(collider);
        }
        this.#collidersToRemove.clear();

        let colliders = this.#collidersArray;
        colliders.length = 0;
        for (const collider of this.#colliders)
            colliders.push(collider)
        
        for (const collider of colliders) {
            collider.update(gameTime);
        }

        for (let i = 0; i < colliders.length; i++) {
            const col1 = colliders[i]!;
            for (let j = i + 1; j < colliders.length; j++) {
                const col2 = colliders[j]!;

                if (col1.shape instanceof Circle) {
                    if (col2.shape instanceof Circle) {
                        let vector = Collisions.intersectCircles(col1.shape, col2.shape) 
                        if (vector != null)
                            this.#resolve(col1, col2, vector);
                    }
                }
            }
            
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const collider of this.#colliders)
            collider.draw(ctx);
    }
    
    #resolve(col1: Collider, col2: Collider, vector: Vector) {
        col1.position.add(vector.divided(2));
        col2.position.subtract(vector.divided(2));
    }
    
}