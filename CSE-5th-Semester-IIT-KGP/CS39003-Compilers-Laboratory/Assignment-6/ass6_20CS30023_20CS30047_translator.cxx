#include "ass6_20CS30023_20CS30047_translator.h"
// Global Variables
vector<Quad *> quadArray;  // Quad Array
SymbolTable *currentTable, *globalTable;  // Symbol Tables
Symbol *currentSymbol;  // Current Symbol
SymbolType::typeEnum currentType;  // Current Type
int tableCount, temporaryCount;  // Counts of number of tables and number of temps generated
vector<string> stringLiterals;
// Implementation of activation record class
ActivationRecord::ActivationRecord() : totalDisplacement(0), displacement(map<string, int>()) {}  // start with an initial displacement of 0
// Implementation of symbol type class
SymbolType::SymbolType(typeEnum type, SymbolType *arrayType, int width) : type(type), width(width), arrayType(arrayType) {}
// Implementation of sizes for symbol types
int SymbolType::getSize() {
    switch(type) {
        case CHAR:      return 1;
        case INT:       return 4;
        case FLOAT:     return 8;
        case POINTER:   return 8;
        case ARRAY:     return width * (arrayType->getSize());
        default:        return 0;  
    }
}
// Function to print symbol type
string SymbolType::toString() {
    switch(this->type) {
        case SymbolType::VOID: return "void";
        case SymbolType::CHAR: return "char";
        case SymbolType::INT:  return "int";
        case SymbolType::FLOAT: return "float";
        case SymbolType::POINTER: return "ptr(" + this->arrayType->toString() + ")";
        case SymbolType::FUNCTION: return "function";
        case SymbolType::ARRAY: return "array(" + to_string(this->width) + ", " + this->arrayType->toString() + ")";
        case SymbolType::BLOCK: return "block";
    }
    return "";
}
// Implementation of symbol table class
SymbolTable::SymbolTable(string name, SymbolTable *parent) : name(name), parent(parent) {}
Symbol *SymbolTable::lookup(string name) {
    // If the symbol is present in the current table, return it
    auto it = (this)->symbols.find(name);
    if (it != (this)->symbols.end())
        return &(it->second);
    // If the symbol is not present in the current table, check the parent table
    Symbol *ret_ptr = nullptr;
    if (this->parent != NULL)
        ret_ptr = this->parent->lookup(name);
    // if the symbol is not present in the parent table, insert it in the current table and return
    if (this == currentTable && !ret_ptr) {
        ret_ptr = new Symbol(name);
        ret_ptr->category = Symbol::LOCAL;
        if(currentTable == globalTable)
            ret_ptr->category = Symbol::GLOBAL;
        this->symbols.insert({name, *ret_ptr});
        return &((this)->symbols.find(name)->second);
    }
    return ret_ptr;
}
// Update the symbol table and its children with offsets
void SymbolTable::update() {
    // first update the current table
    vector<SymbolTable *> visited; // vector to keep track of children tables to visit
    int offset;
    for (auto &map_entry : (this)->symbols) { // for all symbols in the table
        // if the symbol is the first one in the table then set offset of it to 0
        map_entry.second.offset = (map_entry.first == (this->symbols).begin()->first) ? 0 : offset;  
        offset = (map_entry.first == (this->symbols).begin()->first) ? map_entry.second.size : offset + map_entry.second.size; // else update the offset of the symbol and update the offset by adding the symbols width
        if (map_entry.second.nestedTable)  // remember children table
            visited.push_back(map_entry.second.nestedTable);
    }
    // now prepare activation record for the current table
    activationRecord = new ActivationRecord();
    // first stack the parameters
    for (auto map_entry : (this)->symbols)
        if (map_entry.second.category == Symbol::PARAMETER)
            if(map_entry.second.size != 0) {
                activationRecord->totalDisplacement -= map_entry.second.size;
                activationRecord->displacement[map_entry.second.name] = activationRecord->totalDisplacement;
            }
    // now stack the local variables and the temporaries
    for (auto map_entry : (this)->symbols)
        if ((map_entry.second.category == Symbol::LOCAL && map_entry.second.name != "return") || map_entry.second.category == Symbol::TEMPORARY)
            if(map_entry.second.size != 0) {
                activationRecord->totalDisplacement -= map_entry.second.size;
                activationRecord->displacement[map_entry.second.name] = activationRecord->totalDisplacement;
            }
    // update children table
    for (auto &table : visited)
        table->update();
}
// Function to print the symbol table and its children
void SymbolTable::print() {
    // pretty print 
    cout << string(140, '=') << endl;
    cout << "Table Name: " << this->name <<"\t\t Parent Name: "<< ((this->parent)?this->parent->name:"None") << endl;
    cout << string(140, '=') << endl;
    cout << setw(20) << "Name" << setw(40) << "Type" << setw(20) << "Category" << setw(20) << "Initial Value" << setw(20) << "Offset" << setw(20) << "Size" << setw(20) << "Child" << "\n" << endl;
    // cout<<"Name\t Type\t InitialValue\t Offset\t Size\n";
    vector<SymbolTable *> tovisit;
    // print all the symbols in the table
    for (auto &map_entry : (this)->symbols) {
        cout << setw(20) << map_entry.first;
        fflush(stdout);
        cout << setw(40) << map_entry.second.type->toString();
        cout << setw(20);
        if(map_entry.second.category == Symbol::LOCAL)  cout << "local";
        else if(map_entry.second.category == Symbol::GLOBAL)  cout << "global";
        else if(map_entry.second.category == Symbol::FUNCTION)  cout << "function";
        else if(map_entry.second.category == Symbol::PARAMETER)  cout << "parameter";
        else if(map_entry.second.category == Symbol::TEMPORARY)  cout << "temporary";
        cout << setw(20) << map_entry.second.initialValue << setw(20) << map_entry.second.offset << setw(20) << map_entry.second.size;
        cout << setw(20) << (map_entry.second.nestedTable ? map_entry.second.nestedTable->name : "NULL") << endl;
        // remember to print nested tables later
        if (map_entry.second.nestedTable)
            tovisit.push_back(map_entry.second.nestedTable);
    }
    cout << string(140, '-') << "\n\n" << endl;
    for (auto &table : tovisit)  // print nested tables
        table->print();
}
// Implementation of symbol class
Symbol::Symbol(string name, SymbolType::typeEnum type, string init) : name(name), type(new SymbolType(type)), offset(0), nestedTable(NULL), initialValue(init) {
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
    if ((this->type)->type == SymbolType::typeEnum::FLOAT) {
        // if the target type is inst
        if (type_ == SymbolType::typeEnum::INT) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "Float_TO_Int(" + this->name + ")");
            return fin_;
        }
        // if the target type is char 
        else if (type_ == SymbolType::typeEnum::CHAR) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "Float_TO_Char(" + this->name + ")");
            return fin_;
        }
        // reutrn orignal symbol if the final type is not int or char 
        return this;
    }
    // if current type is int
    else if ((this->type)->type == SymbolType::typeEnum::INT) {
        // if the target type is float
        if (type_ == SymbolType::typeEnum::FLOAT) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "INT_TO_Float(" + this->name + ")");
            return fin_;
        }
        // if the target type is char
        else if (type_ == SymbolType::typeEnum::CHAR) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "INT_TO_Char(" + this->name + ")");
            return fin_;
        }
        // reutrn orignal symbol if the final type is not float or char
        return this;
    }
    // if the current type si char
    else if ((this->type)->type == SymbolType::typeEnum::CHAR) {
        // if the target type is int
        if (type_ == SymbolType::typeEnum::INT) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "Char_TO_Int(" + this->name + ")");
            return fin_;
        }
        // if the target type is float
        else if (type_ == SymbolType::typeEnum::FLOAT) {
            // generate symbol of new type
            Symbol *fin_ = gentemp(type_);
            emit("=", fin_->name, "Char_TO_Float(" + this->name + ")");
            return fin_;
        }
        // reutrn orignal symbol if the final type is not int or float
        return this;
    }
    return this;
}
// Implementation of quad class
Quad::Quad(string result, string arg1, string op, string arg2) : result(result), op(op), arg1(arg1), arg2(arg2) {}
Quad::Quad(string result, int arg1, string op, string arg2) : result(result), op(op), arg1(toString(arg1)), arg2(arg2) {}
// print the quad 
void Quad::print() {
    // if binary operations
    auto binary_print = [this]() {
        cout << "\t" << this->result << " = " << this->arg1 << " " << this->op << " " << this->arg2 << endl;
    };
    // if relational operators
    auto relation_print = [this]() {
        cout << "\tif " << this->arg1 << " " << this->op << " " << this->arg2 << " goto " << this->result << endl;
    };
    // if shift operators
    auto shift_print = [this]() {
        cout << "\t" << this->result << " " << this->op[0] << " " << this->op[1] << this->arg1 << endl;
    };
    // if special type of operators
    auto shift_print_ = [this](string tp) {
        cout << "\t" << this->result << " " << tp << " " << this->arg1 << endl;
    };
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
        cout << "Function start: " << this->result << endl;
    else if (this->op == "labelend")
        cout << "Function end: " << this->result << endl;
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
    else if (this->op == "=str")
        cout << "\t" << this->result << " = " << stringLiterals[atoi(this->arg1.c_str())] << endl;
    else if (this->op == "~")
        shift_print_("= ~");
    else if (this->op == "!")
        shift_print_("= !");
    else
    {
        // if none of the above operators
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
    // for all the addresses in the list, add the target address 
    for (auto &i : list_)
        quadArray[i-1]->result = toString(addr);
}
void finalBackpatch() {
    // any dangling exits for void type functions are sent to function end
    int curPos = quadArray.size();
    int lastExit = -1;
    for(auto it = quadArray.rbegin(); it != quadArray.rend(); it++) {
        string op = (*it)->op;
        if(op == "labelend") 
            lastExit = curPos;
        else if(op == "goto" or op == "==" or op == "!=" or op == "<" or op == ">" or op == "<=" or op == ">=") {
            if((*it)->result.empty()) 
                (*it)->result = toString(lastExit);
        }
        curPos--;
    }
}
list<int> makeList(int base) {
    // returns list with the base address as its only value
    return {base};
}
list<int> merge(list<int> first, list<int> second) {
    // merge two lists
    list<int> ret = first;
    ret.merge(second);
    return ret;
}
// Implementation of Expression class functions
void Expression::toInt() {
    // if the expression type is boolean
    if (this->type == Expression::typeEnum::BOOLEAN) {
        // generate symbol of new type and do backpatching and other required operations
        this->symbol = gentemp(SymbolType::typeEnum::INT);
        backpatch(this->trueList, static_cast<int>(quadArray.size()+1)); // update the true list
        emit("=", this->symbol->name, "true");                        // emit the quad
        emit("goto", toString(static_cast<int>(quadArray.size() + 2)));  // emit the goto quad
        backpatch(this->falseList, static_cast<int>(quadArray.size()+1));  // update the false list
        emit("=", this->symbol->name, "false");
    }
}
void Expression::toBool() {
    // if the expression type is non boolean
    if (this->type == Expression::typeEnum::NONBOOLEAN)
    {
        // generate symbol of new type and do backpatching and other required operations
        this->falseList = makeList(static_cast<int>(quadArray.size()+1)); // update the falselist
        emit("==", "", this->symbol->name, "0");                        // emit general goto statements
        this->trueList = makeList(static_cast<int>(quadArray.size()+1));  // update the truelist
        emit("goto", "");
    }
}
// returns the next instruction number
int nextInstruction() { return quadArray.size() + 1; }
// generates temporary of given type with given value s
Symbol *gentemp(SymbolType::typeEnum type, string s) {
    Symbol *temp = new Symbol("t" + toString(temporaryCount++), type, s);
    temp->category = Symbol::TEMPORARY;
    currentTable->symbols.insert({temp->name, *temp});
    return temp;
}
// change current table to specified table
void changeTable(SymbolTable *table) {
    currentTable = table;
}

// code to check if a and b are of the same type, promotes to the higher type if feasible and if that makes the type of both the same
bool typeCheck(Symbol *&a, Symbol *&b) {   // lambda function to check if a and b are of the same type  
    std::function<bool(SymbolType *, SymbolType *)> type_comp = [&](SymbolType *first, SymbolType *second) -> bool {
        if (!first and !second)
            return true;
        else if (!first or !second or first->type != second->type)
            return false;
        else
            return type_comp(first->arrayType, second->arrayType);
    };
    if(type_comp(a->type, b->type))   // if the types are same return true
        return true;
    // if the types are not same but can be cast safely according the rules, then cast and return
    else if(a->type->type == SymbolType::FLOAT or b->type->type == SymbolType::FLOAT) {
        a = a->convert(SymbolType::FLOAT);
        b = b->convert(SymbolType::FLOAT);
        return true;
    }
    else if(a->type->type == SymbolType::INT or b->type->type == SymbolType::INT) {
        a = a->convert(SymbolType::INT);
        b = b->convert(SymbolType::INT);
        return true;
    }
    else   // return false if not possible to cast safelt to same type 
        return false;
}
// Implementation of utility functions
// overloaded toString function to maintain semantic consistency 
string toString(int i)   {   // convert int to string
    return to_string(i);
}
string toString(float f) {  // converts float to string
    return to_string(f);
}
string toString(char c)  {  // converts char to string
    return string(1, c);
}