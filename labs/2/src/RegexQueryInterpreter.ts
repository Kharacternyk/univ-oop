import {QueryInterpreter} from "./QueryInterpreter";

export class RegexQueryInterpreter implements QueryInterpreter {
    public getRegex(query: string) {
        return new RegExp(query, "u");
    }
}
