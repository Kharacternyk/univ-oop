import {QueryInterpreter} from "./QueryInterpreter";

export class CaseInsensitiveQueryInterpreterDecorator implements QueryInterpreter {
    private readonly interpreter: QueryInterpreter;

    public constructor(interpreter: QueryInterpreter) {
        this.interpreter = interpreter;
    }

    public getRegex(query: string) {
        return new RegExp(this.interpreter.getRegex(query), "i");
    }
}
