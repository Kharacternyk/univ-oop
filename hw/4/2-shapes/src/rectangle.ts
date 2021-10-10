import { Shape } from "./shape";

export type RectangleSides = [number, number];

export class Rectangle extends Shape {
    private sides: RectangleSides;

    public constructor(sides: RectangleSides) {
        super();
        this.sides = sides;
    }

    public getPerimeter(): number {
        return 2 * (this.sides[0] + this.sides[1]);
    }

    public getSquare(): number {
        return this.sides[0] * this.sides[1];
    }
}
