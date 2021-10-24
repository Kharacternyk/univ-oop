import { ExpressionLexer } from '../src/grammar/ExpressionLexer';
import { ExpressionParser } from '../src/grammar/ExpressionParser';

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

    test(`"${input}" is ${expected ? "" : "not "}an expression`, () => {
        if (expected) {
            parser.expression()
        } else {
            expect(() => parser.expression()).toThrow();
        }
    });
}

check("42", true);
check("inc(512)", true);
check("dec(inc(((123))) + 2)", true);
check("(((0)))", true);
check("C22", true);
check("A2+3", true);
check("A2 + 3", true);
check("A2/3 + C22*(1 + Z1)", true);
check("-2 + -B2", true);
check("-1--2", true);
check("+++-+4", true);
check("mod(5, C22)", true);
check("100 000 000", true);

check("1.0", false);
check("inc1", false);
check("\t  ", false); 
check("((0)", false);
check("mod(5 2)", false);
