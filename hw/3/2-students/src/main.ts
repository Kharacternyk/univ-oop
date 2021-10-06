import { GoodStudent } from "./goodStudent";
import { BadStudent } from "./badStudent";
import { Group } from "./group";

import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("How is the group called? ", name => {
    const group = new Group(name);

    rl.question("Which students are there (type:name)? ", input => {
        const studentsInput = input.split(" ");
        const students = [];

        for (const studentInput of studentsInput) {
            const [type, name] = studentInput.split(":");
            if (type === "good") {
                students.push(new GoodStudent(name));
            } else {
                students.push(new BadStudent(name));
            }
            group.addStudent(students[students.length - 1]);
        }

        rl.question("What should students do? ", input => {
            const actions = input.split(" ");
            for (const action of actions) {
                switch (action) {
                    case "relax": students.forEach(student => student.relax()); break;
                    case "read": students.forEach(student => student.read()); break;
                    case "write": students.forEach(student => student.write()); break;
                    case "study": students.forEach(student => student.study()); break;
                }
            }
            process.stdout.write("\n" + group.getFullInfo());
            rl.close();
        });
    });
});
