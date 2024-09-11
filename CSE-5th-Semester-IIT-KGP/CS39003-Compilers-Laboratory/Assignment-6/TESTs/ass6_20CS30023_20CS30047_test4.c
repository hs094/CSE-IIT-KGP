int printStr(char *s);
int readInt(int *eP);
int printInt(int n);

void fillFib(int *ser, int n)
{
    int i;
    for (i = 0; i < n; i++)
    {
        if (i == 0)
        {
            ser[i] = 1;
        }
        else if (i == 1)
        {
            ser[i] = 2;
        }
        else
        {
            ser[i] = (3 * ser[i - 1] * ser[i - 2]) % (10007);
        }
    }
}

int main()
{
    printStr("\n#### TEST 4 (1-D Arrays) ####");
    int ser[9];
    fillFib(ser, 9);
    int i,j;
    printStr("\n Special Product Series: ");
    for (i = 0; i < 9; i++)
    {
        printInt(ser[i]);
        printStr(" ");
    }
    char vowels[5];
    vowels[0] = 'a';
    vowels[1] = 'e';
    vowels[2] = 'i';
    vowels[3] = 'o';
    vowels[4] = 'u';
    printStr("\n Ascii values of vowels: ");
    for (i = 0; i < 5; i++)
    {
        printInt(vowels[i]);
        printStr(" ");
    }
    printStr("\n\n");
    return 0;
}
