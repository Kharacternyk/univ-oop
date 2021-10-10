import { Triangle } from "./triangle";

export class IsoscelesTriangle extends Triangle {
    public constructor(side: number, angle: number) {
        super(side, side, angle);
    }
}
