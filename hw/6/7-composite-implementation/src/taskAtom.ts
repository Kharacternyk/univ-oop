import {Task} from "./task";

export class TaskAtom implements Task {
    private readonly name: string;
    private done: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    public isDone() {
        return this.done;
    }

    public markDone() {
        this.done = true;
    }

    public toString() {
        return `(${this.done ? "X" : " "}) ${this.name}`;
    }
}
