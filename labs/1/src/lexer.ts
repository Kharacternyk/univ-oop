import { ExpressionLexer } from './grammar/ExpressionLexer';
import { ThrowingErrorListener } from './throwingErrorListener';

export class Lexer extends ExpressionLexer {
    constructor(inputStream) {
        super(inputStream);
        this.removeErrorListeners();
        this.addErrorListener(new ThrowingErrorListener());
    }
}

