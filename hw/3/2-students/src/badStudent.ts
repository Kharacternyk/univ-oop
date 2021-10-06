import { Student } from "./student";

export class BadStudent extends Student {
    public constructor(name: string) {
        super(name);
        this.append("Bad");
    }

    public study(): void {
        this.relax();
        this.relax();
        this.relax();
        this.relax();
        this.read();
    }
}
