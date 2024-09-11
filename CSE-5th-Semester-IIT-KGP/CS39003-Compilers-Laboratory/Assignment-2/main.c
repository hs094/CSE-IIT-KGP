/*
*
*    Name:- Hardik Pravin Soni
*    Roll No:- 20CS30023
*    Compilers Labortary - Assignment 2
*/
#include "myl.h"

/*
*   @ desc Declaration of main
*   @ input  {void} No Input
*   @ output {int} 0 is returned as Exit Code.
*
*/

int main(void)
{
    printStr("------------ Testing the library ------------\n");
    printStr("---------------------------------------------\n");
    printStr("\n********* Testing the printStr function ********\n");
    printStr("\n# Test Case 1:\n");
    char *str1 = "\tTesting my own library for Compilers Assignment.\n";
    int lenStr1 = printStr(str1);
    printStr("\tLength of str1 is : ");
    printInt(lenStr1);
    printStr("\n\n");
    printStr("# Test Case 2:\n");
    char *str2 = "\tThis is a sample text to test for special characters @#$^%&\n";
    int lenStr2 = printStr(str2);
    printStr("\tLength of str2 is : ");
    printInt(lenStr2);
    printStr("\n\n");
    printStr("# Test Case 3:\n");
    char *str3 = "\tSample Text: !@#$^&*()-_+= 123749534975983 []{}();:<>\n";
    int lenStr3 = printStr(str3);
    printStr("\tLength of str3 is : ");
    printInt(lenStr3);
    printStr("\n\n");
    printStr("# Test Case 4:\n");
    char *str4 = "\tabcdefgfedcba\n\tabcdef fedcba\n\tabcde   edcba\n\tabcd     dcba\n\tabc\t  cba\n\tab\t   ba\n\ta\t    a\n";
    int lenStr4 = printStr(str4);
    printStr("\tLength of str4 is : ");
    printInt(lenStr4);
    printStr("\n\n");
    printStr("# Test Case 5:\n");
    char *str5 = "";
    int lenStr5 = printStr(str5);
    printStr("\tLength of str4 is : ");
    printInt(lenStr5);
    printStr("\n\n");
    printStr("\n********* Testing the printInt function ********\n");
    printStr("\n# Test Case 1:\n\t");
    int num1 = 2147483647;
    int lenNum1 = printInt(num1);
    printStr("\n");
    printStr("\tNumber of Characters printed in num1 is : ");
    printInt(lenNum1);
    printStr("\n\n");
    printStr("# Test Case 2:\n\t");
    int num2 = -2147483648;
    int lenNum2 = printInt(num2);
    printStr("\n");
    printStr("\tNumber of Characters printed in num2 is : ");
    printInt(lenNum2);
    printStr("\n\n");
    printStr("# Test Case 3:\n\t");
    int num3 = -78324678;
    int lenNum3 = printInt(num3);
    printStr("\n");
    printStr("\tNumber of Characters printed in num3 is : ");
    printInt(lenNum3);
    printStr("\n\n");
    printStr("# Test Case 4:\n\t");
    int num4 = 0;
    int lenNum4 = printInt(num4);
    printStr("\n");
    printStr("\tNumber of Characters printed in num4 is : ");
    printInt(lenNum4);
    printStr("\n\n");
    printStr("\n********* Testing the readInt function ********\n");
    int i = 1;
    int ch = 0;
    int n;
    while (!ch)
    {
        printStr("Enter:\n");
        printStr("\t0. To Exit Testing readInt Function.\n");
        printStr("\t1. For Custom Input of Integer.\n");
        printStr("\t Your Response: ");
        ch = readInt(&n);
        if (n == 0)
        {
            break;
        }
        if (n != 1)
        {
            ch = 0;
            continue;
        }
        if (ch)
        {
            if (n == 1)
            {
                // printStr("Enter 1 to Input Integer or 0 to Exit:- ");
                // ch = readInt(&n);
                // // printStr("\n");
                for (; n; i++)
                {
                    printStr("\n# Test Case ");
                    printInt(i);
                    printStr("\n\t");
                    printStr("Enter a Number: ");
                    ch = readInt(&n);
                    if (ch)
                    {
                        printStr("\tNumber: ");
                        printStr("\t");
                        int len = printInt(n);
                        printStr("\n");
                        printStr("\tLength of Number: ");
                        printInt(len);
                        printStr("\n");
                    }
                    else
                    {
                        printStr("\tError!! Invalid Integer. Either it is out range or you made a typo.\n");
                    }
                    printStr("\tEnter 1 to continue taking Integer as Input or 0 to Exit:- ");
                    ch = readInt(&n);
                    printStr("\n");
                }
            }
        }
    }
    printStr("\n");
    printStr("\n********* Testing the printFlt function ********\n");
    printStr("\n# Test Case 1:\n\t");
    float f1 = -98.1234;
    int len1 = printFlt(f1);
    printStr("\n");
    printStr("\tNumber of Characters printed in f1 is : ");
    printInt(len1);
    printStr("\n");
    printStr("# Test Case 2:\n\t");
    float f2 = 12.12345;
    int len2 = printFlt(f2);
    printStr("\n");
    printStr("\tNumber of Characters printed in f2 is : ");
    printInt(len2);
    printStr("\n");
    printStr("# Test Case 3:\n\t");
    float f3 = 7.8368497;
    int len3 = printFlt(f3);
    printStr("\n");
    printStr("\tNumber of Characters printed in f3 is : ");
    printInt(len3);
    printStr("\n");
    printStr("# Test Case 4:\n\t");
    float f4 = -23457834.00000;
    int len4 = printFlt(f4);
    printStr("\n\tNumber of Characters printed in f4 is : ");
    printInt(len4);
    printStr("\n");
    printStr("\n********* Testing the readFlt function ********\n");
    float f;
    i = 1;
    ch = 0;
    while (!ch)
    {
        printStr("Enter:\n");
        printStr("\t0. To Exit Testing readFlt Function.\n");
        printStr("\t1. For Custom Input of Floating Point Number.\n");
        printStr("\t Your Response: ");
        ch = readInt(&n);
        if (n == 0)
        {
            break;
        }
        if (ch != 1)
        {
            ch = 0;
            continue;
        }
        if (ch)
        {
            if (n == 1)
            {
                // printStr("Enter 1 to Floating Point Integer or 0 to Exit:- ");
                // ch = readInt(&n);
                // printStr("\n");
                for (; n; i++)
                {
                    printStr("\n# Test Case ");
                    printInt(i);
                    printStr("\n\t");
                    printStr("Enter a Decimal: ");
                    ch = readFlt(&f);
                    if (ch)
                    {
                        printStr("\tDecimal: ");
                        printStr("\t");
                        int len = printFlt(f);
                        printStr("\n");
                        printStr("\tLength of Decimal: ");
                        printInt(len);
                        printStr("\n");
                    }
                    else
                    {
                        printStr("\tError!! Invalid Decimal. Either it is out range or you made a typo.\n");
                    }
                    printStr("\tEnter 1 to continue taking Floating Point Integer as Input or 0 to Exit:- ");
                    ch = readInt(&n);
                    printStr("\n");
                }
            }
        }
    }
    printStr("---------------------------------------------------------\n");
    printStr("----------------------THANK YOU-------------------------\n");
    printStr("---------------------------------------------------------\n");
    return 0;
}