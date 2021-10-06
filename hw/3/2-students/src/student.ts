export abstract class Student {
    private name: string;
    private state: string;

    public constructor(name: string) {
        this.name = name;
        this.state = "";
    }

    public abstract study(): void;

    public getName(): string {
        return this.name;
    }

    public getState(): string {
        return this.state;
    }

    public relax(): void {
        this.append("Relax");
    }

    public read(): void {
        this.append("Read");
    }

    public write(): void {
        this.append("Write");
    }

    protected append(state: string) {
        if (!this.state) {
            this.state += state;
        } else {
            this.state += " " + state;
        }
    }
}
