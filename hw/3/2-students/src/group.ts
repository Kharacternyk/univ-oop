import { Student } from "./student";

export class Group {
    private name: string;
    private students: Array<Student>;

    public constructor(name: string) {
        this.name = name;
        this.students = [];
    }

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public getInfo(): string {
        let status = this.name + ":\n";
        for (const student of this.students) {
            status += student.getName() + "\n";
        }
        return status;
    }

    public getFullInfo(): string {
        let status = `Group ${this.name}\nStudents:\n`;
        for (const student of this.students) {
            status += `${student.getName()} (${student.getState()})\n`;
        }
        return status;
    }
}
