import { Triangle } from "./triangle";

export class RightTriangle extends Triangle {
    public constructor(side1: number, side2: number) {
        super(side1, side2, Math.PI / 2);
    }
}
