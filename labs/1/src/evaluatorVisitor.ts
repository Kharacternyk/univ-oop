import { ExpressionVisitor } from './grammar/ExpressionVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree';

type CellValueRetriever = (cell: string) => number;

type TerminalContext = {
    text: string,
}

type RuleContext = {
    expression: (index?: number) => ParseTree,
}

export
class EvaluatorVisitor
extends AbstractParseTreeVisitor<number>
implements ExpressionVisitor<number> {
    private readonly cellValueRetriever: CellValueRetriever;

    constructor(cellValueRetriever: CellValueRetriever) {
        super();
        this.cellValueRetriever = cellValueRetriever;
    }

    defaultResult() {
        return 0;
    }

    visitNumber(context: TerminalContext) {
        return Number(context.text);
    }

    visitCell(context: TerminalContext) {
        return this.cellValueRetriever(context.text);
    }

    visitBraced(context: RuleContext) {
        return this.visit(context.expression());
    }

    visitPositive(context: RuleContext) {
        return +this.visit(context.expression());
    }

    visitNegative(context: RuleContext) {
        return -this.visit(context.expression());
    }

    visitIncrement(context: RuleContext) {
        return this.visit(context.expression()) + 1;
    }

    visitDecrement(context: RuleContext) {
        return this.visit(context.expression()) - 1;
    }

    visitAddition(context: RuleContext) {
        return this.visit(context.expression(0)) + this.visit(context.expression(1));
    }

    visitSubstraction(context: RuleContext) {
        return this.visit(context.expression(0)) - this.visit(context.expression(1));
    }

    visitMultiplication(context: RuleContext) {
        return this.visit(context.expression(0)) * this.visit(context.expression(1));
    }

    visitDivision(context: RuleContext) {
        return this.visit(context.expression(0)) / this.visit(context.expression(1));
    }

    visitModulo(context: RuleContext) {
        return this.visit(context.expression(0)) % this.visit(context.expression(1));
    }

    visitQuotient(context: RuleContext) {
        return Math.floor(
            this.visit(context.expression(0)) / this.visit(context.expression(1))
        );
    }
}
