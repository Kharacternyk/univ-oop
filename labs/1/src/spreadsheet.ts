import { Lexer } from './lexer';
import { Parser } from './parser';
import { EvaluatorVisitor } from './evaluatorVisitor';

import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

export class Spreadsheet {
    private cellTrees: object = {};
    private cellValues: object = {};
    private listener: (cell: string, value: number) => void;

    public setExpression(cell: string, input: string) {
        const inputStream = new ANTLRInputStream(input);
        const lexer = new Lexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new Parser(tokenStream);

        this.cellTrees[cell] = parser.expression();

        this.evaluate();
    }

    public listen(listener) {
        this.listener = listener;
    }

    public unlisten() {
        delete this.listener;
    }

    private evaluate() {
        this.cellValues = {};
        for (const cell in this.cellTrees) {
            this.evaluateCell(cell);
        }
    }

    private evaluateCell(cell) {
        if (!this.cellTrees[cell]) {
            throw new Error(`undefined cell: ${cell}`);
        }
        if (cell in this.cellValues) {
            return this.cellValues[cell];
        }

        const evaluator = new EvaluatorVisitor(cell => this.evaluateCell(cell));
        const value = evaluator.visit(this.cellTrees[cell]);

        this.cellValues[cell] = value;

        if (this.listener) {
            this.listener(cell, value);
        }

        return value;
    }
}
