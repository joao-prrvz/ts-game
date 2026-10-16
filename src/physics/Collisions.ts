import { Vector } from "../core/index.js";
import type { Circle, Polygon } from "../shapes/index.js";

export class Collisions {

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

    static intersectPolygons(p1: Polygon, p2: Polygon): Vector|null {
        let verticesA = p1.transformedVertices;
        let verticesB = p2.transformedVertices;
        let pathA = this.#checkVertices(verticesA, verticesB);
        if (pathA == null)
            return null;
        let pathB = this.#checkVertices(verticesB, verticesA);
        if (pathB == null)
            return null;
        
        let path = pathA.length < pathB.length ? pathA : pathB; 

        let direction = p1.position.subtracted(p2.position);
        if (direction.dot(path) < 0)
            path.multiply(-1);

        return path;
    }

    static intersectCirclePolygon(circle: Circle, polygon: Polygon): Vector | null {
        let vertices = polygon.transformedVertices;
        let depth = Number.MAX_VALUE;
        let normal = Vector.zero;
        // Check polygon edge normals
        for (let i = 0; i < vertices.length; i++) {
            let va = vertices[i]!;
            let vb = vertices[(i + 1) % vertices.length]!;

            let edge = vb.subtracted(va);
            let axis = new Vector(-edge.y, edge.x);

            let { min: minA, max: maxA } = this.#projectVertices(vertices, axis);
            let { min: minB, max: maxB } = this.#projectCircle(circle, axis);

            // A separating axis means there is no collision
            if (minA >= maxB || minB >= maxA)
                return null;

            let axisDepth = Math.min(maxB - minA, maxA - minB);

            if (axisDepth < depth) {
                depth = axisDepth;
                normal = axis;
            }
        }

        // Check the axis between the circle and its closest polygon vertex
        let cpIndex = this.#findClosestPointOnPolygone(circle.position, vertices);
        let cp = vertices[cpIndex]!;

        let axis = cp.subtracted(circle.position).normalized();

        let { min: minA, max: maxA } = this.#projectVertices(vertices, axis);
        let { min: minB, max: maxB } = this.#projectCircle(circle, axis);

        if (minA >= maxB || minB >= maxA)
            return null;

        let axisDepth = Math.min(maxB - minA, maxA - minB);

        if (axisDepth < depth) {
            depth = axisDepth;
            normal = axis;
        }

        depth /= normal.length;
        normal.normalize();
        // Calculate the minimum translation vector
        let path = new Vector(normal.x * depth, normal.y * depth);

        // Orient the vector from the circle toward the polygon
        let direction = polygon.position.subtracted(circle.position);

        if (direction.dot(path) < 0)
            path.multiply(-1);

        return path;
    }


    static #checkVertices(verticesA: Vector[], verticesB: Vector[]) {
        let depth = Number.MAX_VALUE; 
        let normal = Vector.zero;
        for (let i = 0; i < verticesA.length; i++) {
            let va = verticesA[i]!;
            let vb = verticesA[(i + 1) % verticesA.length]!;

            let edge = vb?.subtracted(va);
            let axis = new Vector(-edge.y, edge.x);

            let {min: minA, max: maxA} = this.#projectVertices(verticesA, axis);
            let {min: minB, max: maxB} = this.#projectVertices(verticesB, axis);

            if (minA >= maxB || minB >= maxA)
                return null;

            let axisDepth = Math.min(maxB - minA, maxA - minB)

            if (axisDepth < depth) {
                depth = axisDepth;
                normal = axis;
            }
        }
        depth /= normal.length;
        return normal.normalized().multiplied(depth); 
    }

    static #projectCircle(circle: Circle, axis: Vector) {
        let direction = axis.normalized();
        let directionAndRadius = direction.multiplied(circle.radius);
        let p1 = circle.position.added(directionAndRadius);
        let p2 = circle.position.subtracted(directionAndRadius);
        let min = p1.dot(axis);
        let max = p2.dot(axis);
        if (min > max) {
            let temp = min;
            min = max;
            max = temp;
        }

        return { min, max };
    }

    static #findClosestPointOnPolygone(circlePosition: Vector, vertices: Vector[]) {
        let result = 1;
        let minDistance = Number.MAX_VALUE;
        for (let i = 0; i < vertices.length; i++) {
            const vertice = vertices[i]!;
            let distance = vertice.distance(circlePosition);

            if (distance < minDistance) {
                minDistance = distance
                result = i;
            }
        }
        return result;
    }

    static #projectVertices(vertices: Vector[], axis: Vector) {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (const vertice of vertices) {
            let proj = axis.dot(vertice);
            if (proj < min)
                min = proj;
            if (proj > max)
                max = proj;
        }

        return { min, max };
    }

    static #fincArithmeticMean(vertices: Vector[]) {
        let sumX = 0;
        let sumY = 0;
        for (const vertice of vertices) {
            sumX += vertice.x;
            sumY += vertice.y;
        }
        return new Vector(sumX, sumY).divided(vertices.length);
    }
}