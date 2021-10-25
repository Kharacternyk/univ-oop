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
    expression Multiplication expression #Multiplication
    |
    expression Division expression #Division
    |
    expression Addition expression #Addition
    |
    expression Substraction expression #Substraction
    |
    Modulo LeftBrace expression Separator expression RightBrace #Modulo
    |
    Quotient LeftBrace expression Separator expression RightBrace #Quotient
    ;

Cell: ('A'..'Z')+ Integer;
Number: Integer ('.' Integer)?;
Integer: ('0'..'9')+;
LeftBrace: '(';
RightBrace: ')';
Increment: 'inc';
Decrement: 'dec';
Addition: '+';
Substraction: '-';
Multiplication: '*';
Division: '/';
Modulo: 'mod';
Quotient: 'div';
Separator: ',';

WhiteSpace: [\t\n\r ] -> channel(HIDDEN);
