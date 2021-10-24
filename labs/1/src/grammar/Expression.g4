grammar Expression;

expression:
    EOF #Undefined
    |
    definedExpression #Defined
    ;

definedExpression:
    Number #Number
    |
    Cell #Cell
    |
    LeftBrace definedExpression RightBrace #Braced
    |
    Addition definedExpression #Positive
    |
    Substraction definedExpression #Negative
    |
    Increment LeftBrace definedExpression RightBrace #Increment
    |
    Decrement LeftBrace definedExpression RightBrace #Decrement
    |
    Modulo LeftBrace definedExpression Separator definedExpression RightBrace #Modulo
    |
    definedExpression Addition definedExpression #Addition
    |
    definedExpression Substraction definedExpression #Substraction
    |
    definedExpression Multiplication definedExpression #Multiplication
    |
    definedExpression Division definedExpression #Division
    ;

Cell: ('A'..'Z') Number;
Number: ('0'..'9')+;
LeftBrace: '(';
RightBrace: ')';
Increment: 'inc';
Decrement: 'dec';
Addition: '+';
Substraction: '-';
Multiplication: '*';
Division: '/';
Modulo: 'mod';
Separator: ',';

WhiteSpace: [\t\n\r ] -> channel(HIDDEN);
