export class Triangle {
    private a: number;
    private b: number;
    private c: number;

    public setA(length: number): void {
        this.a = length;
    }

    public setB(length: number): void {
        this.b = length;
    }

    public setC(length: number): void {
        this.c = length;
    }

    public getA(): number {
        return this.a;
    }

    public getB(): number {
        return this.b;
    }

    public getC(): number {
        return this.c;
    }

    public getPerimeter(): number {
        return this.a + this.b + this.c;
    }

    public getAlpha(): number {
        return this.applyCosineLaw(this.a, this.b, this.c);
    }

    public getBeta(): number {
        return this.applyCosineLaw(this.b, this.a, this.c);
    }

    public getGamma(): number {
        return this.applyCosineLaw(this.c, this.a, this.b);
    }

    private applyCosineLaw(gegenSide, adjacentSide1, adjacentSide2) {
        this.checkSides();
        return Math.acos(
            (adjacentSide1 ** 2 + adjacentSide2 ** 2 - gegenSide ** 2)
            /
            (2 * adjacentSide1 * adjacentSide2)
        );
    };

    private checkSides(): void {
        const [a, b, c] = [this.a, this.b, this.c];
        if (a + b < c || a + c < b || b + c < a) {
            throw new RangeError(`Invalid sides for a triangle: ${a}, ${b}, ${c}`);
        }
    }
}
