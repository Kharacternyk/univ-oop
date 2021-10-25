import { ExpressionLexer } from '../src/grammar/ExpressionLexer';
import { ExpressionParser } from '../src/grammar/ExpressionParser';
import { EvaluatorVisitor } from '../src/evaluatorVisitor';

import {
    ANTLRInputStream,
    CommonTokenStream,
    ParserErrorListener,
} from 'antlr4ts';

import { ParseCancellationException } from 'antlr4ts/misc';

class ThrowingErrorListener implements ParserErrorListener {
    public syntaxError(recognizer, symbol, line, position, message, error) {
        const cause = new Error(message);
        throw new ParseCancellationException(cause);
    }
}

function check(input, expected) {
    const inputStream = new ANTLRInputStream(input);
    const lexer = new ExpressionLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ExpressionParser(tokenStream);

    lexer.removeErrorListeners();
    lexer.addErrorListener(new ThrowingErrorListener());
    parser.removeErrorListeners();
    parser.addErrorListener(new ThrowingErrorListener());

    const expression = parser.expression()
    const evaluator = new EvaluatorVisitor();

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
