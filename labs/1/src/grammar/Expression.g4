grammar Expression;

expression:
    Number #Number
    |
    Cell #Cell
    |
    LeftBrace expression RightBrace #Braced
    |
    Addition expression #Positive
    |
    Substraction expression #Negative
    |
    Increment LeftBrace expression RightBrace #Increment
    |
    Decrement LeftBrace expression RightBrace #Decrement
    |
    Modulo LeftBrace expression Separator expression RightBrace #Modulo
    |
    expression Addition expression #Addition
    |
    expression Substraction expression #Substraction
    |
    expression Multiplication expression #Multiplication
    |
    expression Division expression #Division
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
