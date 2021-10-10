import { Shape } from "./shape";

export class Rhombus extends Shape {
    private side: number;
    private angle: number;

    public constructor(side: number, angle: number) {
        super();
        this.side = side;
        this.angle = angle;
    }

    public getPerimeter(): number {
        return 4 * this.side;
    }

    public getSquare(): number {
        return this.side**2 * Math.sin(this.angle);
    }
}
