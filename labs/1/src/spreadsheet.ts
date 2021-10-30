import { Lexer } from './lexer';
import { Parser } from './parser';
import { EvaluatorVisitor } from './evaluatorVisitor';

import { ParseTree } from 'antlr4ts/tree';
import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

type Listener = (cell: string, value: number) => void;

export class Spreadsheet {
    private cellInputs: Map<string, string> = new Map();
    private cellTrees: Map<string, ParseTree> = new Map();
    private cellValues: Map<string, number> = new Map();
    private listener: Listener = () => 0;

    public setExpression(cell: string, input: string) {
        const inputStream = new ANTLRInputStream(input);
        const lexer = new Lexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser(tokenStream);

        this.cellInputs.set(cell, input);
        this.cellTrees.set(cell, parser.expression());
        this.evaluate();
    }

    public setListener(listener: Listener) {
        this.listener = listener;
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.cellInputs.entries()));
    }

    public fromString(serialized: string) {
        for (const [cell, input] of JSON.parse(serialized)) {
            this.setExpression(cell, input);
        }
    }

    private evaluate() {
        this.cellValues.clear();
        for (const cell of this.cellTrees.keys()) {
            this.evaluateCell(cell);
        }
    }

    private evaluateCell(cell: string): number {
        if (!this.cellTrees.has(cell)) {
            throw new Error(`undefined cell: ${cell}`);
        }
        if (this.cellValues.has(cell)) {
            return this.cellValues.get(cell);
        }

        const evaluator: EvaluatorVisitor = new EvaluatorVisitor(
            cell => this.evaluateCell(cell)
        );
        const value: number = evaluator.visit(this.cellTrees.get(cell));

        this.cellValues.set(cell, value);
        this.listener(cell, value);

        return value;
    }
}
