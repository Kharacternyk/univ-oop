import { ExpressionParser } from './grammar/ExpressionParser';
import { ThrowingErrorListener } from './throwingErrorListener';
import { TokenStream } from "antlr4ts/TokenStream";

export class Parser extends ExpressionParser {
    constructor(tokenStream: TokenStream) {
        super(tokenStream);
        this.removeErrorListeners();
        this.addErrorListener(new ThrowingErrorListener());
    }
}

