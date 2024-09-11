int printStr(char *s);
int readInt(int *eP);
int printInt(int n);

int main() {
    printStr("\n#### TEST 1 (Conditional operators) ####\n");
    int n1, n2;
    n1 = 5, n2 = 5;
    printStr("\nTesting == operator: ");
    if (n1 == n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is EQUAL to ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }
    n2 = 6;
    printStr("\nTesting != operator: ");
    if (n1 != n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is NOT EQUAL to ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }
    n1 = -1, n2 = 3;
    printStr("\nTesting < operator (strictly less): ");
    if (n1 < n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is LESS than ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }
    n2 = -1;
    printStr("\nTesting < operator (equality): ");
    if (n1 < n2) {
        printStr("Failed");
    }
    else {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is NOT LESS than but EQUAL to ");
        printInt(n2);
        printStr("!\n");
    }
    printStr("\nTesting <= operator (equality): ");
    if (n1 <= n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is LESS than  EQUAL to ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }

    n1 = -2;
    printStr("\nTesting <= operator (strictly less): ");
    if (n1 <= n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is LESS than ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }

    n1 = 7;
    printStr("\nTesting > operator (strictly greater): ");
    if (n1 > n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is GREATER than ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }
    n2 = 7;
    printStr("\nTesting > operator (equality): ");
    if (n1 > n2) {
        printStr("Failed");
    }
    else {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is NOT GREATER than ");
        printInt(n2);
        printStr("!\n");
    }
    printStr("\nTesting >= operator (equality): ");
    if (n1 >= n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is GREATER than EQUAL to ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }

    n1 = 8;
    printStr("\nTesting >= operator (strictly greater): ");
    if (n1 >= n2) {
        printStr("Passed: ");
        printInt(n1);
        printStr(" is GREATER THAN ");
        printInt(n2);
        printStr("!\n");
    }
    else {
        printStr("Failed");
    }

    printStr("\n\n");
    return 0;
}
