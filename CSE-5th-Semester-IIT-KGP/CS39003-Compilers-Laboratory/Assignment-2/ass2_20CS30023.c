/*
    Name:- Hardik Pravin Soni
    Roll No:- 20CS30023
    Compilers Labortary - Assignment 2
*/
// including 
#include "myl.h"

#define BUFFER 100
#define MAXIMUM_POSITIVE 2147483647
#define MAXIMUM_ABS_NEGATIVE -2147483648

/*
*   @ desc  Function to print a string (character array)
*   @ input {char* s} :- Character array to be printed.
*   @ output {int length} :- The Length of the string to be printed
*/

int printStr(char *s)
{
    int length = 0;
    for (; s[length] != '\0'; length++)
    {
        ;
    }
    __asm__ __volatile__(
        "movl $1, %%eax \n\t"
        "movq $1, %%rdi \n\t"
        "syscall \n\t"
        :
        : "S"(s), "d"(length));
    return length;
}

/*
*   @ desc Function to print a string (character array)
*   @ input {int n} Integer to be printed 
*   @ output {int size} :- The Length of the Integer printed on the console
*/

int printInt(int n)
{
    int i;
    char s[BUFFER];
    int size = 0;

    int sign = n > 0 ? 1 : -1;
    i = 0;
    if (n < 0)
        s[i++] = '-';
    if (n == 0)
        s[i++] = '0';
    else
    {
        while (n)
        {
            s[i++] = (char)((sign * (n % 10)) + '0');
            n /= 10;
        }
        // the number is stored in a reverse fashion, hence reversing the array;
        int j = (s[0] == '-') ? 1 : 0;
        int k = i - 1;
        while (j < k)
        {
            char temp = s[j];
            s[j] = s[k];
            s[k] = temp;
            j++;
            k--;
        }
    }
    size = i;
    __asm__ __volatile__(
        "movl $1, %%eax \n\t"
        "movq $1, %%rdi \n\t"
        "syscall \n\t"
        :
        : "S"(s), "d"(size));
    return size;
}

/*
*   @ desc  Function to read a Integer, from console 
*   @ input {int *n} Pointer to store the value of the Integer read as character array from the console
*   @ output {int } Return OK(1) if successful, else ERR(0) if unsuccessful
*/

int readInt(int *n)
{
    int len;
    char read[BUFFER] = {'0'};
    int i = 0;

    __asm__ __volatile__(
        "movl $0, %%eax \n\t"
        "movq $0, %%rdi \n\t"
        "syscall \n\t"
        : "=a"(len)
        : "S"(read), "d"(BUFFER));
    
    // If 'length' <=0 then return ERR
    if (len <= 0)
        return ERR;
    // Declaraing two variables one to store the sign of the number and the other to store the number
    int mark = 1;
    long int value = 0;
    
    if (read[i] == '-')
        mark = -1, i++;
    while (i < len && read[i] != '\n')
    {
        // Check if read[i] is valid
        if (read[i] < '0' || read[i] > '9')
            return ERR;
        // Retrieving the value of read[i]
        int curr = (int)(read[i] - '0');
        if (curr < 0 || curr > 9)
            return ERR;
        // Storing the value
        value = value * 10 + (mark * curr);
        if (value > MAXIMUM_POSITIVE || value < MAXIMUM_ABS_NEGATIVE)
            return ERR;
        i++;
    }
    // Passing the value to pointer
    *n = (int)value;
    // Return OK if Successful read Integer
    return OK;
}

/*
*   @ desc Function to read a Floating Point Decimal, from console
*   @ input {float *f}:  Pointer to store the value of the Floating Point Decimal read as character array from the console
*   @ output {int}: Return OK(1) if successful, else ERR(0) if unsuccessful
*/

int readFlt(float *f)
{

    char s[BUFFER] = {'0'};
    int length = 0;
    int idx = 0;
    int mark = 1;
    float value = 0.0;
    float shift = 10.F;
    __asm__ __volatile__(
        "movl $0, %%eax \n\t"
        "movq $0, %%rdi \n\t"
        "syscall \n\t"
        : "=a"(length)
        : "S"(s), "d"(BUFFER));
    if (length < 0)
        return ERR;

    if (s[idx] == '+' || s[idx] == '-')
    {
        if (s[idx] == '-')
            mark = -1;
        idx++;
    }
    while (idx < length && s[idx] != '\n' && s[idx] != '.' && s[idx] != '\0')
    {
        if (s[idx] < '0' || s[idx] > '9')
            return ERR;
        int curr = (int)(s[idx] - '0');
        if (curr < 0 || curr > 9)
            return ERR;
        value *= 10;
        value += curr;
        idx++;
    }
    if (s[idx] == '.')
    {
        ++idx;
        while (idx < length && s[idx] != '\n' && s[idx] != '\0')
        {
            if (s[idx] < '0' || s[idx] > '9')
                return ERR;
            float curr = (float)(s[idx] - '0');
            curr /= shift;
            value = value + curr;
            shift *= 10.F;
            idx++;
        }
    }
    if (mark == -1)
        value = -value;
    *f = (float)value;
    return OK;
}

/*
*   @ desc Function to read a Floating Point Decimal, from console
*   @ input {float *f}:  Pointer to store the value of the Floating Point Decimal read as character array from the console
*   @ output {int}: Return OK(1) if successful, else ERR(0) if unsuccessful
*/

int printFlt(float f)
{
    char s[BUFFER];
    int length = 0;
    if (f < 0)
    {
        f *= -1;
        s[length++] = '-';
    }
    int integer = (int)f;
    f = f - integer;
    while (integer)
    {
        s[length] = '0' + integer % 10;
        integer = integer / 10;
        length++;
    }
    // As the integral part was stored in reverse order, reversing the number stored
    int j = (s[0] == '-') ? 1 : 0;
    int k = (length - 1);
    while (j < k)
    {
        char temp = s[j];
        s[j] = s[k];
        s[k] = temp;
        j++, k--;
    }
    // PLacing the decimal point
    if (f != 0.0)
    {
        s[length++] = '.';
        int q = 6;
        for (int i = 0; i < q; i++)
            f = f * 10, q--;
        j = length;
        int fr = f;
        while (fr)
        {
            s[length] = ('0' + (fr % 10));
            fr /= 10;
            length++;
        }
        k = length - 1;
        while (j < k)
        {
            char temp = s[j];
            s[j] = s[k];
            s[k] = temp;
            j++, k--;
        }
        while (length >= 1 && s[length - 1] == '0')
            length--;
    }
    else
    {
        s[length++] = '.';
        s[length++] = '0';
        s[length++] = '0';
    }
    __asm__ __volatile__(
        "movl $1, %%eax \n\t"
        "movq $1, %%rdi \n\t"
        "syscall \n\t"
        :
        : "S"(s), "d"(length));
    return length;
}