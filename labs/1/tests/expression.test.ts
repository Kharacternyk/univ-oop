import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';

import {
    ANTLRInputStream,
    CommonTokenStream,
} from 'antlr4ts';

function check(input, expected) {
    const inputStream = new ANTLRInputStream(input);
    const lexer = new Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);

    test(`"${input}" is ${expected ? "" : "not "}an expression`, () => {
        if (expected) {
            parser.expression()
        } else {
            expect(() => parser.expression()).toThrow();
        }
    });
}

check("42", true);
check("1.7", true);
check("inc(512)", true);
check("dec(inc(((123))) + 2)", true);
check("(((0)))", true);
check("C22", true);
check("ABC123", true);
check("A2+3", true);
check("A2 + 3", true);
check("A2/3 + C22*(1 + Z1)", true);
check("-2 + -B2", true);
check("-1--2", true);
check("+++-+4", true);
check("mod(5, C22)", true);
check("div(5, C22)", true);
check("100 000 000", true);

check("\t  ", false);
check("123ABC", false);
check("C22 +", false);
check("inc1", false);
check("((0)", false);
check("mod(5 2)", false);
