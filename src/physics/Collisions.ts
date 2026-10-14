import type Vector from "../core/Vector";
import type Circle from "../shapes/Circle";

export default class Collisions {

    static intersectCircles(c1: Circle, c2: Circle): Vector|null {
        let distance = c1.position.subtracted(c2.position).length;
        let radii = c1.radius + c2.radius;
        if (distance >= radii)
            return null;
        let depth = radii - distance;
        let normal = c1.position
            .subtracted(c2.position)
            .normalized()
            .multiplied(depth);
        return normal;
    }
}