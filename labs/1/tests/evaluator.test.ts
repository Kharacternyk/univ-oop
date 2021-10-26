import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { EvaluatorVisitor } from '../src/evaluatorVisitor';

import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

const CELL_STUBS = {
    A1: 1,
    B2: 2,
};

function check(input, expected) {
    const inputStream = new ANTLRInputStream(input);
    const lexer = new Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);
    const expression = parser.expression()
    const evaluator = new EvaluatorVisitor(cell => CELL_STUBS[cell] ?? 0);

    test(`"${input}" is evaluated to ${expected}`, () => {
        const result = evaluator.visit(expression);
        expect(result).toBe(expected);
    });
}

check("42", 42);
check("1.7", 1.7);
check("((42))", 42);
check("inc(42)", 43);
check("dec(inc(42))", 42);
check("mod(42, 5)", 2);
check("div(42, 5)", 8);
check("6 * (2 + 5)", 42);
check("6 / (2 - 5)", -2);
check("6 * 2 + 5", 17);
check("A1 + B2 + C3", 3);
check("A1 * B2 * C3", 0);
