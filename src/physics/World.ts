import type { Vector } from "../core/index.js";
import { Circle, Polygon, Rectangle } from "../shapes/index.js";
import { Collider } from "./Collider.js";
import { Collisions } from "./Collisions.js";
import { CollisionTypes } from "./CollisionType.js";


export class World {
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

    update(deltaTime: number) {
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
            collider.update(deltaTime);
        }

        for (let i = 0; i < colliders.length; i++) {
            const col1 = colliders[i]!;
            for (let j = i + 1; j < colliders.length; j++) {
                const col2 = colliders[j]!;
                let vector: Vector|null = null;
                if (col1.shape instanceof Circle) {
                    if (col2.shape instanceof Circle)
                        vector = Collisions.intersectCircles(col1.shape, col2.shape); 
                    else if (col2.shape instanceof Rectangle)
                        vector = Collisions.intersectCirclePolygon(col1.shape, col2.shape);
                }
                else if (col1.shape instanceof Polygon) {
                    if (col2.shape instanceof Polygon)
                        vector = Collisions.intersectPolygons(col1.shape, col2.shape);
                    else if (col2.shape instanceof Circle)
                        vector = Collisions.intersectCirclePolygon(col2.shape, col1.shape);
                }
                if (vector != null)
                    this.#resolve(col1, col2, vector);
            }
            
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const collider of this.#colliders)
            collider.draw(ctx);
    }
    
    #resolve(col1: Collider, col2: Collider, vector: Vector) {
        let i = 0;
        if (col1.collisionType == CollisionTypes.static && col2.collisionType == CollisionTypes.dynamic) {
            col2.position.subtract(vector);
        }
        else if (col1.collisionType == CollisionTypes.dynamic && col2.collisionType == CollisionTypes.static) {
            col1.position.add(vector);
        }
        else if (
            (col1.collisionType == CollisionTypes.dynamic && col2.collisionType == CollisionTypes.dynamic)
            || (col1.collisionType == CollisionTypes.static && col2.collisionType == CollisionTypes.static)
        ) {
            col1.position.add(vector.divided(2));
            col2.position.subtract(vector.divided(2));
        }
    }
    
}