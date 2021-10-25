import { ExpressionVisitor } from './grammar/ExpressionVisitor'

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'

export
class EvaluatorVisitor
extends AbstractParseTreeVisitor<number>
implements ExpressionVisitor<number> {
    private readonly cellValueRetriever: (cell: string) => number;

    constructor(cellValueRetriever) {
        super();
        this.cellValueRetriever = cellValueRetriever;
    }

    defaultResult() {
        return 0;
    }

    visitNumber(context) {
        return Number(context.text);
    }

    visitCell(context) {
        return this.cellValueRetriever(context.text);
    }

    visitBraced(context) {
        return this.visit(context.expression());
    }

    visitPositive(context) {
        return +this.visit(context.expression());
    }

    visitNegative(context) {
        return -this.visit(context.expression());
    }

    visitIncrement(context) {
        return this.visit(context.expression()) + 1;
    }

    visitDecrement(context) {
        return this.visit(context.expression()) - 1;
    }

    visitAddition(context) {
        return this.visit(context.expression(0)) + this.visit(context.expression(1));
    }

    visitSubstraction(context) {
        return this.visit(context.expression(0)) - this.visit(context.expression(1));
    }

    visitMultiplication(context) {
        return this.visit(context.expression(0)) * this.visit(context.expression(1));
    }

    visitDivision(context) {
        return this.visit(context.expression(0)) / this.visit(context.expression(1));
    }

    visitModulo(context) {
        return this.visit(context.expression(0)) % this.visit(context.expression(1));
    }

    visitQuotient(context) {
        return Math.floor(
            this.visit(context.expression(0)) / this.visit(context.expression(1))
        );
    }
}
