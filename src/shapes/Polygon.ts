import Transform from "../core/Transform.js";
import Vector from "../core/Vector.js";
import Shape from "./Shape.js";

export default class Polygon extends Shape {

    protected triangles: number[];
    protected vertices: Vector[];

    get updateRequired() {
        if (!this.#oldPosition.equals(this.position)) {
            this.#oldPosition = this.position.clone();
            return true;
        }
        if (this.#oldAngle != this.angle) {
            this.#oldAngle = this.angle;
            return true;
        }
        if (this.#transformedVertices.length != this.vertices.length)
            return true;
        return false
    }
    
    get transformedVertices(): Vector[] {
        if (this.updateRequired) {
            let tranform = new Transform(this.position, this.angle)
            for (let i = 0; i < this.vertices.length; i++) {
                this.#transformedVertices[i] = this.vertices[i]!.transformed(tranform);
            }
        }
        return this.#transformedVertices;
    }

    
    #oldPosition = Vector.zero;
    #oldAngle = 0;
    #transformedVertices: Vector[] = [];

    constructor(vertices: Vector[], triangles: number[]) {
        super();
        this.vertices = vertices;
        this.triangles = triangles;
    }

    draw(ctx: CanvasRenderingContext2D, origin = Vector.zero): void {
        Shape.drawPolygon(ctx, this.transformedVertices, this.triangles, this.style, this.color);
    }



}