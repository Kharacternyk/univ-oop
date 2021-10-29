import { Lexer } from './lexer';
import { Parser } from './parser';
import { EvaluatorVisitor } from './evaluatorVisitor';

import { ParseTree } from 'antlr4ts/tree';
import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

type listener = (cell: string, value: number) => void;

export class Spreadsheet {
    private cellTrees: Map<string, ParseTree> = new Map();
    private cellValues: Map<string, number> = new Map();
    private listener: listener | null;

    public setExpression(cell: string, input: string) {
        const inputStream = new ANTLRInputStream(input);
        const lexer = new Lexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser(tokenStream);

        this.cellTrees.set(cell, parser.expression());
        this.evaluate();
    }

    public listen(listener: listener) {
        this.listener = listener;
    }

    public unlisten() {
        this.listener = null;
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

        if (this.listener) {
            this.listener(cell, value);
        }

        return value;
    }
}
