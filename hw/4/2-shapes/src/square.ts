import { Rectangle } from "./rectangle";

export class Square extends Rectangle {
    public constructor(side: number) {
        super([side, side]);
    }
}
