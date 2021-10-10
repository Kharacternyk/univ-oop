import { Triangle } from "./triangle";

export class EquilateralTriangle extends Triangle {
    private square: number;

    public setA(length: number): void {
        this.setSide(length);
    }

    public setB(length: number): void {
        this.setSide(length);
    }

    public setC(length: number): void {
        this.setSide(length);
    }

    public setSide(length: number): void {
        super.setA(length);
        super.setB(length);
        super.setC(length);
        this.square = length**2 * 3**0.5 / 4;
    }

    public getSquare(): number {
        return this.square;
    }
}
