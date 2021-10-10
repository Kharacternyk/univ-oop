import { Shape } from "./shape";

export class Circle extends Shape {
    private radius: number;

    public constructor(radius: number) {
        super();
        this.radius = radius;
    }

    public getPerimeter(): number {
        return this.radius * 2 * Math.PI;
    }

    public getSquare(): number {
        return this.radius**2 * Math.PI;
    }
}
