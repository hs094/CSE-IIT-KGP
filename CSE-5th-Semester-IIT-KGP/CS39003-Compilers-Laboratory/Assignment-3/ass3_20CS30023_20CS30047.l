/* C Declarations and Definitions */
%{
    #define KEYWORD                     250
    #define IDENTIFIER                  251
    #define enum_lit                    252
    #define STRING_LITERAL              253
    #define INTEGER_LITERAL             254
    #define FLOATING_LITERAL            255
    #define CHAR_LITERAL                    256
    #define PUNCTUATOR                  257
    #define SINGLE_LINE_COMMENT         258
    #define MULTIPLE_LINE_COMMENT       259
    #define INVALID_Token               260
%}

%x SINGLE_LINE_COMMENT_BODY
%x MULTIPLE_LINE_COMMENT_BODY

KEYWORD "auto" | "enum" | "restrict" | "unsigned" | "break" | "extern" | "return" | "void" | "case" | "float" | "short" | "volatile" | "char" | "for" | "signed" | "while" | "const" | "goto" | "sizeof" | "_Bool" | "continue" | "if" | "static" | "_Complex" | "default" | "inline" | "struct" | "_Imaginary" | "do" | "int" | "switch" | "double" | "long" | "typedef" | "else" | "register" | "union"
IDENTIFIER [a-zA-Z_][a-zA-Z_0-9]*
digit [0-9]
non_zero_digit [1:9]
dig_seq {digit}+
INTEGER_LITERAL {non_zero_digit}{digit}*|"0"
enum_lit {IDENTIFIER}
escape_sequence "\\\'" | "\\\"" | "\\?" | "\\\\" | "\\a" | "\\b" | "\\f" | "\\n" | "\\r" | "\\t" | "\\v"
PUNCTUATOR "["|"]"|"("|")"|"{"|"}"|"."|"->"|"++"|"--"|"&"|"*"|"+"|"-"|"~"|"!"|"/"|"%"|"<<"|">>"|"<"|">"|"<="|">="|"=="|"!="|"^"|"|"|"&&"|"||"|"?"|":"|";"|"..."|"="|"*="|"/="|"%="|"+="|"-="|"<<="|">>="|"&="|"^="|"|="|","|"#"
WhiteSpace  [ \t\n]
Exponent [eE]([+-]?)({dig_seq})
Fraction_Constant {dig_seq}?\.{dig_seq}|{dig_seq}\.
FLOATING_LITERAL {Fraction_Constant}{Exponent}? | {dig_seq}{Exponent}
CHAR_LITERAL [^\'\n\\] | {escape_sequence}
char_sequence {CHAR_LITERAL}+
STRING_LITERA [^\"n\\] | {escape_sequence}

%%
    {KEYWORD;}                  { return KEYWORD; }
    {IDENTIFIER;}               { return IDENTIFIER; }
    {INTEGER_LITERAL;}          { return INTEGER_LITERAL; }
    {STRING_LITERAL;}           { return STRING_LITERAL; }
    {CHAR_LITERAL;}             { return CHAR_LITERAL; }
    {FLOATING_LITERAL;}         { return FLOATING_LITERAL; }
    {PUNCTUATOR;}               { return PUNCTUATOR; }
%%