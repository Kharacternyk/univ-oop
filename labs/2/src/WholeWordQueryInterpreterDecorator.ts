import {QueryInterpreter} from "./QueryInterpreter";

export class WholeWordQueryInterpreterDecorator implements QueryInterpreter {
    private readonly interpreter: QueryInterpreter;

    public constructor(interpreter: QueryInterpreter) {
        this.interpreter = interpreter;
    }

    public getRegex(query: string) {
        const base = this.interpreter.getRegex(query);
        const source = base.source;
        const flags = base.flags;

        return new RegExp("(\\s|^)" + source + "(\\s|$)", flags);
    }
}
