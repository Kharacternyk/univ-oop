import { ParserErrorListener } from 'antlr4ts';
import { ParseCancellationException } from 'antlr4ts/misc';

export class ThrowingErrorListener implements ParserErrorListener {
    public syntaxError(recognizer, symbol, line, position, message, error) {
        const cause = new Error(message);
        throw new ParseCancellationException(cause);
    }
}
