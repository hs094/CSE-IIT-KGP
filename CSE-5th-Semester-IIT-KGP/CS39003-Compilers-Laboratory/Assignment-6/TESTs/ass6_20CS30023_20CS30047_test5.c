int printStr(char *s);
int readInt(int *eP);
int printInt(int n);

int max(int num1, int num2)
{
    if (num1 > num2)
        return num1;
    else
        return num2;
}

int main()
{
    printStr("\n#### TEST 5 (Loops) ####\n");
    int i = 0;
    int iters, ep;

    printStr("\n\n");
    printStr("\nTesting DO-WHILE loop:");
    do
    {
        if (i == 0)
        {
            printStr("\nEntered do-while loop. Enter number of times you wish to run the loop after this: ");
            iters = readInt(&ep);
            if (ep != 0)
            {
                printStr("\nInvalid input. Exiting...\n\n");
                return 0;
            }
        }
        else
        {
            printStr("\nIteration ");
            printInt(i);
            printStr("\n");
        }
    } while (i++ < iters);

    printStr("\nPattern printing using FOR loop:");
    printStr("\n\n");

    int n = 9;
    printStr("Enter a value of n for the STAR pattern: ");
    n = readInt(&ep);
    if (ep != 0)
    {
        printStr("\nInvalid input. Exiting...\n\n");
        return 0;
    }
    else
    {
        int i, j;
        for (i = 1; i <= n; i++)
        {
            for (j = 1; j <= (2 * n); j++)
            {
                if (i > (n - j + 1))
                    printStr(" ");
                else
                    printStr("*");
                if ((i + n) > j)
                    printStr(" ");
                else
                    printStr("*");
            }
            printStr("\n");
        }
        for (i = 1; i <= n; i++)
        {
            for (j = 1; j <= (2 * n); j++)
            {
                if (i < j)
                    printStr(" ");
                else
                    printStr("*");
                if (i <= ((2 * n) - j))
                    printStr(" ");
                else
                    printStr("*");
            }
            printStr("\n");
        }
    }
    int prod = 17;
    i = 17;
    printStr("\nTable of 17 using WHILE loop: ");
    while (prod <= 170)
    {
        printInt(prod);
        printStr(" ");
        prod = prod + 17;
    }
    printStr("\n\n");
    return 0;
}
