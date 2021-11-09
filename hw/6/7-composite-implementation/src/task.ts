export interface Task {
    isDone(): boolean;
    markDone(): void;
    toString(): string;
}
