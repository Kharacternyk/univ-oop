import { ExpressionParser } from './grammar/ExpressionParser';
import { ThrowingErrorListener } from './throwingErrorListener';

export class Parser extends ExpressionParser {
    constructor(tokenStream) {
        super(tokenStream);
        this.removeErrorListeners();
        this.addErrorListener(new ThrowingErrorListener());
    }
}

