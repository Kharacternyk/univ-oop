export abstract class Triangle {
    private side1: number;
    private side2: number;
    private angle: number;

    public constructor(side1: number, side2: number, angle: number) {
        this.side1 = side1;
        this.side2 = side2;
        this.angle = angle;
    }

    public getPerimeter(): number {
        const {side1, side2, angle} = this;
        return side1 + side2 + (side1**2 + side2**2 - 2*side1*side2*Math.cos(angle));
    }

    public getSquare(): number {
        const {side1, side2, angle} = this;
        return side1 * side2 * Math.sin(angle) / 2;
    }
}
