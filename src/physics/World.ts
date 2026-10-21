import { ObjectManager, type Vector } from "../core/index.js";
import { Circle, Polygon, Rectangle } from "../shapes/index.js";
import { Collider } from "./Collider.js";
import { Collisions } from "./Collisions.js";
import { CollisionTypes } from "./CollisionType.js";


export class World extends ObjectManager<Collider> {

    #collidersArray: Collider[] = [];
    #collisions = new Map<Collider, Set<Collider>>();

    update(deltaTime: number) {
        for (let i = 0; i < 5; i++) {
            super.update(deltaTime);
            let colliders = this.#collidersArray;
            colliders.length = 0;
            for (const collider of this.items)
                colliders.push(collider)
            for (const collider of colliders)
                collider.update(deltaTime);
            this.#checkCollisions();
        }
    }

    #checkCollisions() {
        let colliders = this.#collidersArray;
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
                if (vector != null) {
                    this.#resolve(col1, col2, vector);
                    let colliders = this.#collisions.get(col1) ?? new Set<Collider>();
                    colliders.add(col2);
                    this.#collisions.set(col1, colliders);
                }
                else {
                    let colliders = this.#collisions.get(col1) ?? null;
                    if (colliders == null || !colliders.has(col2))
                        continue;
                    if (col1.collisionType == CollisionTypes.transparent)
                        col1.onbodyleave(col2);
                    if (col2.collisionType == CollisionTypes.transparent)
                        col2.onbodyleave(col1);
                    colliders.delete(col2);
                }
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const collider of this.items)
            collider.draw(ctx);
    }
    
    #resolve(col1: Collider, col2: Collider, vector: Vector) {
        if (col1.collisionType == CollisionTypes.static && col2.collisionType == CollisionTypes.dynamic)
            col2.position.subtract(vector);
        else if (col1.collisionType == CollisionTypes.dynamic && col2.collisionType == CollisionTypes.static)
            col1.position.add(vector);
        else if (
            (col1.collisionType == CollisionTypes.dynamic && col2.collisionType == CollisionTypes.dynamic)
            || (col1.collisionType == CollisionTypes.static && col2.collisionType == CollisionTypes.static)
        ) {
            col1.position.add(vector.divided(2));
            col2.position.subtract(vector.divided(2));
        }
        let colliders = this.#collisions.get(col1) ?? null;
        if (colliders != null && colliders.has(col2))
            return;
        if (col1.collisionType == CollisionTypes.transparent)
            col1.onbodyenter(col2);
        if (col2.collisionType == CollisionTypes.transparent)
            col2.onbodyenter(col1);
    }
    
}