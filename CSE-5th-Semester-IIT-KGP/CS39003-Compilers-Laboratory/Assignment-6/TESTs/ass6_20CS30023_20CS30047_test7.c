int printStr(char *s);
int readInt(int *eP);
int printInt(int n);

void testIncDec(int n) {
    printStr("Value passed to function = ");
    printInt(n);
    printStr("\n");
}
int main() {
    printStr("\n#### TEST 7 (Arithmetic operators) ####");
    int x = 78, y = 32, z = 12, w = -39;

    int n5 = x + y;
    int n6 = x - y;
    int n7 = x * y;
    int n8 = x / y;
    int n9 = x % y;

    int x0 = -x + y - z + w + 10;
    int x1 = x * y / z + w - 10;
    int x2 = x + y * z / w - 0;
    int x3 = (x + y) * (-z / w) - 15;

    printStr("\nx = ");
    printInt(x);
    printStr(" y = ");
    printInt(y);
    printStr(" z = ");
    printInt(z);
    printStr(" w = ");
    printInt(w);

    printStr("\nx + y = ");
    printInt(n5);
    printStr("\nx - y = ");
    printInt(n6);
    printStr("\nx * y = ");
    printInt(n7);
    printStr("\nx / y = ");
    printInt(n8);
    printStr("\nx % y = ");
    printInt(n9);
    
    printStr("\n-x + y - z + w + 10 = ");
    printInt(x0);
    printStr("\nx * y / z + w - 10 = ");
    printInt(x1);
    printStr("\nx + y * z / w - 0 = ");
    printInt(x2);
    printStr("\n(x + y) * (z / w) - 15 = ");
    printInt(x3);
    printStr("\n-z = ");
    printInt(-z);
    printStr("\n-w = ");
    printInt(-w);

    printStr("\nTest pre increment: \n");
    testIncDec(++x);
    printStr("Value after call = ");
    printInt(x);

    printStr("\nTest post increment: ");
    testIncDec(x++);
    printStr("Value after call = ");
    printInt(x);

    printStr("\nTest pre decrement: ");
    testIncDec(--x);
    printStr("Value after call = ");
    printInt(x);

    printStr("\nTest post decrement: ");
    testIncDec(x--);
    printStr("Value after call = ");
    printInt(x);
    
    printStr("\n\n");
    return 0;
}
