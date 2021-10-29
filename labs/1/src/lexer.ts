import { ExpressionLexer } from './grammar/ExpressionLexer';
import { ThrowingErrorListener } from './throwingErrorListener';
import { CharStream } from "antlr4ts/CharStream";

export class Lexer extends ExpressionLexer {
    constructor(charStream: CharStream) {
        super(charStream);
        this.removeErrorListeners();
        this.addErrorListener(new ThrowingErrorListener());
    }
}

