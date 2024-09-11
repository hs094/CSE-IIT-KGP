#include "ass5_20CS30023_20CS30047_translator.h"
// Declaration of Global Variables
vector<Quad *> quadArray;  // Quad Array
SymbolTable *currentTable, *globalTable;  // Symbol Tables
Symbol *currentSymbol;  // Current Symbol
SymbolType::typeEnum currentType;  // Current Type
int ins = 1;
int tableCount = 0, temporaryCount = 0; // Counts of number of tables and number of temps generated respectively
// Implementation of symbol type class
SymbolType::SymbolType(typeEnum type, SymbolType *arrayType, int width) : type(type), width(width), arrayType(arrayType) {}
// Implementation of sizes for symbol types
int SymbolType::getSize() {
    switch(type) {
        case char_: return 1;
        case int_: return 4;
        case pointer_: return 4;
        case float_: return 8;
        case array_: return width * (arrayType->getSize());
        default: return 0;
    }
}
// Function to print symbol type
string SymbolType::toString() {
    switch(this->type) {
        case SymbolType::void_: return "void";
        case SymbolType::pointer_: return "ptr(" + this->arrayType->toString() + ")";
        case SymbolType::float_: return "float";
        case SymbolType::int_: return "int";
        case SymbolType::char_: return "char";
        case SymbolType::func_: return "function";
        case SymbolType::array_: return "array(" + to_string(this->width) + ", " + this->arrayType->toString() + ")";
        case SymbolType::block_: return "block";
        default: return "NA";
    }
}
// Implementation of symbol table class
SymbolTable::SymbolTable(string name, SymbolTable *parent) : name(name), parent(parent) {}
Symbol *SymbolTable::lookup(string name) {
    // If the symbol is present in the current table, return it
    auto it = (this)->symbols.find(name);
    Symbol *ret_ptr = nullptr;
    if (it != (this)->symbols.end())
        return &(it->second);
    // If the symbol is not present in the current table, check the parent table
    if (this->parent != NULL)
        ret_ptr = this->parent->lookup(name);
    // if the symbol is not present in the parent table, insert it in the current table and return
    if (this == currentTable && !ret_ptr) {
        this->symbols.insert({name, *(new Symbol(name))});
        return &((this)->symbols.find(name)->second);
    }
    return ret_ptr;
}
// Update the symbol table and its children with offsets
void SymbolTable::update() {
    vector<SymbolTable *> visited; // vector to keep track of children tables to visit
    int offset;
    for (auto &map_entry : (this)->symbols)   {   // for all symbols in the table
        bool flag = map_entry.first == (this->symbols).begin()->first;
        map_entry.second.offset = (flag) ? 0 : offset;     // if the symbol is the first one in the table then set offset of it to 0
        offset = (flag) ? map_entry.second.size : offset + map_entry.second.size; // else update the offset of the symbol and update the offset by adding the symbols width
        if (map_entry.second.nestedTable)  // remember children table
            visited.push_back(map_entry.second.nestedTable);
    }
    for(int i=0;i<visited.size();i++) {   // update children table
        auto &table = visited[i];
        table->update();
    }
}
// Function to print the symbol table and its children
void SymbolTable::print() {
    // pretty print 
    cout << string(140, '~') << endl;
    cout << "\t\t\tName of Table: " << this->name <<"\t\t\t\t\t Name of Parent: "<< ((this->parent)?this->parent->name:"None") << endl;
    cout << string(140, '=') << endl;
    cout << setw(20) << "Name" << setw(40) << "Type" << setw(20) << "Initial Value" << setw(20) << "Offset" << setw(20) << "Size" << setw(20) << "Child" << "\n" << endl;
    vector<SymbolTable *> tovisit;
    // print all the symbols in the table
    for (auto &map_entry : (this)->symbols) {
        cout << setw(20) << map_entry.first;
        fflush(stdout);
        cout << setw(40) << (map_entry.second.isFunction ? "function" : map_entry.second.type->toString());
        cout << setw(20) << map_entry.second.initialValue << setw(20) << map_entry.second.offset << setw(20) << map_entry.second.size;
        cout << setw(20) << (map_entry.second.nestedTable ? map_entry.second.nestedTable->name : "NULL") << endl;
        if (map_entry.second.nestedTable)  tovisit.push_back(map_entry.second.nestedTable);
    }
    cout << string(140, '.') << endl;
    cout << "\n" << endl;  
    for (auto &table : tovisit) table->print();
}
// Implementation of symbol class
Symbol::Symbol(string name, SymbolType::typeEnum type, string init) : name(name), type(new SymbolType(type)), offset(0), nestedTable(NULL), initialValue(init), isFunction(false) {
    size = this->type->getSize();
}
// update type of the symbol
Symbol *Symbol::update(SymbolType *type) {
    this->type = type;
    size = this->type->getSize();
    return this;
}
// convert the present symbol to different type, return old symbol if conversion not possible 
Symbol *Symbol::convert(SymbolType::typeEnum type_) {
    // if the current type is float
    if ((this->type)->type == SymbolType::typeEnum::float_) {
        // generate symbol of new type
        Symbol *fin_ = gentemp(type_);
        switch(type_) {
            case SymbolType::typeEnum::int_: {    // if the target type is int
                emit("=", fin_->name, "Float_TO_Int(" + this->name + ")");
                return fin_;   
            }
            case SymbolType::typeEnum::char_: {   // if the target type is char
                emit("=", fin_->name, "Float_TO_Char(" + this->name + ")");
                return fin_;
            }
            default: return this; // return orignal symbol if the final type is not int or char 
        }
    }
    // if current type is int
    else if ((this->type)->type == SymbolType::typeEnum::int_) { // generate symbol of new type
        Symbol *fin_ = gentemp(type_);
        switch(type_) {    
            case SymbolType::typeEnum::float_: {  // if the target type is float
                emit("=", fin_->name, "INT_TO_Float(" + this->name + ")");
                return fin_;
            }
            case SymbolType::typeEnum::char_: {   // if the target type is char
                emit("=", fin_->name, "INT_TO_Char(" + this->name + ")");
                return fin_;
            }
            default: return this;  // reutrn orignal symbol if the final type is not float or char
        }
    }
    // if the current type si char
    else if ((this->type)->type == SymbolType::typeEnum::char_) {   // generate symbol of new type
        Symbol *fin_ = gentemp(type_);
        switch(type_) {
            case SymbolType::typeEnum::int_: {  // if the target type is int
                emit("=", fin_->name, "Char_TO_Int(" + this->name + ")");
                return fin_;
            }
            case SymbolType::typeEnum::float_: { // if the target type is float
                emit("=", fin_->name, "Char_TO_Float(" + this->name + ")");
                return fin_;
            }
            default: return this;  // return orignal symbol if the final type is not int or float
        }
    }
    return this;
}
// Implementation of quad class
Quad::Quad(string result, string arg1, string op, string arg2) : result(result), op(op), arg1(arg1), arg2(arg2) {}
Quad::Quad(string result, int arg1, string op, string arg2) : result(result), op(op), arg1(toString(arg1)), arg2(arg2) {}
// print the quad 
void Quad::print() {
    // if binary operations
    auto binary_print = [this]() { cout << "\t" << this->result << " = " << this->arg1 << " " << this->op << " " << this->arg2 << endl; };
    // if relational operators
    auto relation_print = [this]() { cout << "\tif " << this->arg1 << " " << this->op << " " << this->arg2 << " goto " << this->result << endl; };
    // if shift operators
    auto shift_print = [this]() { cout << "\t" << this->result << " " << this->op[0] << " " << this->op[1] << this->arg1 << endl; };
    // if special type of operators
    auto shift_print_ = [this](string tp) { cout << "\t" << this->result << " " << tp << " " << this->arg1 << endl; };
    /* we define the printing format for all operators */
    if (this->op == "=")
        cout << "\t" << this->result << " = " << this->arg1 << endl;
    else if (this->op == "goto")
        cout << "\tgoto " << this->result << endl;
    else if (this->op == "return")
        cout << "\treturn " << this->result << endl;
    else if (this->op == "call")
        cout << "\t" << this->result << " = call " << this->arg1 << ", " << this->arg2 << endl;
    else if (this->op == "param")
        cout << "\t" << "param " << this->result << endl;
    else if (this->op == "label")
        cout << this->result << endl;
    else if (this->op == "=[]")
        cout << "\t" << this->result << " = " << this->arg1 << "[" << this->arg2 << "]" << endl;
    else if (this->op == "[]=")
        cout << "\t" << this->result << "[" << this->arg1 << "] = " << this->arg2 << endl;
    else if (this->op == "+" or this->op == "-" or this->op == "*" or this->op == "/" or this->op == "%" or this->op == "|" or this->op == "^" or this->op == "&" or this->op == "<<" or this->op == ">>")
        binary_print();
    else if (this->op == "==" or this->op == "!=" or this->op == "<" or this->op == ">" or this->op == "<=" or this->op == ">=")
        relation_print();
    else if (this->op == "=&" or this->op == "=*")
        shift_print();
    else if(this->op == "*=")
        cout << "\t" << "*" << this->result << " = " << this->arg1 << endl;
    else if (this->op == "=-")
        shift_print_("= -");
    else if (this->op == "~")
        shift_print_("= ~");
    else if (this->op == "!")
        shift_print_("= !");
    else { // if none of the above operators
        cout << this->op << this->arg1 << this->arg2 << this->result << endl;
        cout << "INVALID OPERATOR\n";
    }
}
// Implementation of emit funtions
void emit(string op, string result, string arg1, string arg2) {
    Quad *q = new Quad(result, arg1, op, arg2);
    quadArray.push_back(q);
}
void emit(string op, string result, int arg1, string arg2) {
    Quad *q = new Quad(result, arg1, op, arg2);
    quadArray.push_back(q);
}
// Implementation of backpatching functions
void backpatch(list<int> list_, int addr) {
    for (auto &i : list_)       // for all the addresses in the list, add the target address 
        quadArray[i-1]->result = toString(addr);
}
list<int> makeList(int base){   // returns list with the base address as its only value
    return {base};              
}
list<int> merge(list<int> first, list<int> second)  {   // merge two lists
    list<int> ret = first;
    ret.merge(second);
    return ret;
}
// Implementation of Expression class functions
void Expression::toInt() {
    if (this->type == Expression::typeEnum::BOOLEAN) {  // if the expression type is boolean
        // generate symbol of new type and do backpatching and other required operations
        this->symbol = gentemp(SymbolType::typeEnum::int_);
        backpatch(this->trueList, static_cast<int>(quadArray.size()+1)); // update the true list
        emit("=", this->symbol->name, "true");                        // emit the quad
        emit("goto", toString(static_cast<int>(quadArray.size() + 2)));  // emit the goto quad
        backpatch(this->falseList, static_cast<int>(quadArray.size()+1));  // update the false list
        emit("=", this->symbol->name, "false");
    }
}
void Expression::toBool() {
    if (this->type == Expression::typeEnum::NONBOOLEAN) { // if the expression type is non boolean
        // generate symbol of new type and do backpatching and other required operations
        this->falseList = makeList(static_cast<int>(quadArray.size()+1)); // update the falselist
        emit("==", "", this->symbol->name, "0");                        // emit general goto statements
        this->trueList = makeList(static_cast<int>(quadArray.size()+1));  // update the truelist
        emit("goto", "");
    }
}
// Implementation of other helper functions
int nextInstruction() {
    return quadArray.size() + 1;         // returns the next instruction number
}
// generates temporary of given type with given value s
Symbol *gentemp(SymbolType::typeEnum type, string s) {
    Symbol *temp = new Symbol("t" + toString(temporaryCount++), type, s);
    currentTable->symbols.insert({temp->name, *temp});
    return temp;
}
// change current table to specified table
void changeTable(SymbolTable *table) { currentTable = table; }
// code to check if a and b are of the same type, promotes to the higher type if feasible and if it makes the type of both same
bool typeCheck(Symbol *&a, Symbol *&b) { 
    std::function<bool(SymbolType *, SymbolType *)> type_comp = [&](SymbolType *first, SymbolType *second) -> bool {
        if (!first and !second)  return true;
        if (!first or !second or first->type != second->type)  return false;
        return type_comp(first->arrayType, second->arrayType);
    };
    if(type_comp(a->type, b->type)) // if the types are same return true
        return true;
    // if the types are not same but can be cast safely according the rules, then cast and return
    if(a->type->type == SymbolType::float_ or b->type->type == SymbolType::float_) {
        a = a->convert(SymbolType::float_);
        b = b->convert(SymbolType::float_);
        return true;
    }
    if(a->type->type == SymbolType::int_ or b->type->type == SymbolType::int_) {
        a = a->convert(SymbolType::int_);
        b = b->convert(SymbolType::int_);
        return true;
    }
    return false;   // return false if not possible to cast safely to same type
}
// overloaded toString function to maintain semantic consistency 
string toString(int i) { return to_string(i); }   // convert int to string
string toString(float f) { return to_string(f); } // converts float to string
string toString(char c) { return string(1, c); }  // converts char to string
int main() { // initialization of global variables and main control of the program
    globalTable = new SymbolTable("global");
    currentTable = globalTable;
    yyparse();
    cout << left; // left allign
    globalTable->update();
    globalTable->print();
    for(auto it : quadArray)  cout << setw(4) << ins++ << ": ", it->print();
    return 0;
}