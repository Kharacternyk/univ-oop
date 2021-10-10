import { Shape } from "./shape";

export type TriangleSides = [number, number, number];

export class Triangle extends Shape {
    private sides: TriangleSides;

    public constructor(sides: TriangleSides) {
        super();
        this.sides = sides;
    }

    public getPerimeter(): number {
        return this.sides.reduce((perimeter, side) => perimeter + side);
    }

    public getSquare(): number {
        const semiPerimeter = this.getPerimeter() / 2;
        return this.sides.reduce((mult, side) => mult * (semiPerimeter - side),
                                 semiPerimeter) ** 0.5;
    }
}
