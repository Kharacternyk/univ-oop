import { Student } from "./student";

export class GoodStudent extends Student {
    public constructor(name: string) {
        super(name);
        this.append("Good");
    }

    public study(): void {
        this.read();
        this.write();
        this.read();
        this.write();
        this.relax();
    }
}
