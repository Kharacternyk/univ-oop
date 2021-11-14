import {QueryInterpreter} from "./QueryInterpreter";

export class LiteralQueryInterpreter implements QueryInterpreter {
    public getRegex(query: string) {
        return new RegExp(this.escapeQuery(query), "u");
    }

    private escapeQuery(query: string) {
        return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
