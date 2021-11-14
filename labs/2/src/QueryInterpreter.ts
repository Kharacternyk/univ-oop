export interface QueryInterpreter {
    getRegex(query: string): RegExp;
}
