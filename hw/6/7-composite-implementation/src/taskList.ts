import { Task } from "./task";

export class TaskList implements Task {
    private readonly name: string;
    private readonly subtasks: Array<Task> = [];

    constructor(name: string) {
        this.name = name;
    }

    public addSubtask(task: Task) {
        this.subtasks.push(task);
    }

    public isDone() {
        return this.subtasks.every(task => task.isDone());
    }

    public markDone() {
        this.subtasks.forEach(task => task.markDone());
    }

    public toString() {
        let result = `[${this.isDone() ? "X" : " "}] ${this.name}:`;

        for (const task of this.subtasks) {
            result += `\n${task.toString()}`;
        }

        return result;
    }
}
