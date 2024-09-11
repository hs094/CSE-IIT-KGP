/*
This test files covers things as:
1D arrays
arithmetic operations in array elements
global variable
pointers and addresses
*/



int printStr(char *s);
int readInt(int *eP);
int printInt(int n);

int e = 5; // test : scope of global variables

int main()
{
    printStr("\n#### TEST 2 (Global variables, pointers and addresses) ####");
    int a = 5;
    // test : poiters
    int *d;
    int *e;
    printStr("\nThe below print statement should print 5:- ");
    printStr("\n");
    d = &a;
    printInt(*d);
    printStr("\n");
    e = &a; // assign same two pointer to a variable
    a--;
    d = &a;
    printStr("The below print statement should print 4");
    printStr("\n");
    printInt(*d);
    printStr("\n");
    printInt(a);
    printStr("\n");
    a--;
    printStr("After decrementing a The below print statement should print 3");
    printStr("\n");
    printInt(*d);
    printStr("\n");
    printInt(*e);
    // Test Expressions
    int test = 1;
    int a = 3, b = 2;
    // // array operations
    int arr[9];
    arr[0] = 1;
    arr[1] = 2;
    a = 1;
    e = 5;
    arr[0] = e;
    arr[1] = (a + b);
    arr[2] = arr[0] * arr[1];
    arr[3] = a * b;
    arr[4] = a++;
    arr[5] = --b;
    arr[6] = 0;
    arr[7] = a / b;
    arr[8] = a % b;
    printStr("\narr[0] = e := ");
    printInt(arr[0]);
    printStr("\narr[1] = a + b := ");
    printInt(arr[1]);
    printStr("\narr[2] = arr[0] * arr[1] :=");
    printInt(arr[2]);
    printStr("\narr[3] = a * b :=");
    printInt(arr[3]);
    printStr("\narr[4] = a++ :=");
    printInt(arr[4]);
    printStr("\narr[5] = --b :=");
    printInt(arr[5]);
    printStr("\narr[6] = 0 :=");
    printInt(arr[6]);
    printStr("\narr[7] = a / b :=");
    printInt(arr[7]);
    printStr("\narr[8] = a mod b :=");
    printInt(arr[8]);
    printStr("\n\n");
    return 0;
}