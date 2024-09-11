#include "myl.h"
#define AFTERDECIMAL 6
#define INT_MAX __INT32_MAX__
#define INT_MIN (-INT_MAX - 1)
int printStr(char *s) {
    int len = 0;
    for( ; s[len] != '\0'; ) len++;
    __asm__ __volatile__(
        "movl $1, %%eax \n\t"
        "movq $1, %%rdi \n\t"
        "syscall \n\t"
        :
        : "S"(s), "d"(len));
    return len;
}
int readInt(int *eP) {
    char in[100];
    int len, sign = 1, index = 0;
    long ret = 0;
    __asm__ __volatile__ (
        "movl $0, %%eax \n\t" 
        "movq $0, %%rdi \n\t"
        "syscall \n\t"
        : "=a"(len)
        :"S"(in), "d"(100));
    if(len < 0) {
        *eP = ERR;
        return 0;
    }
    if(index < len) {
        if(in[index] == '-' || in[index] == '+') {
            if(in[index] == '-') sign = -1;
            index++;
        } 
    }
    while(index < len && in[index] != '\n') {
        if(in[index] < '0' || in[index] > '9') {
            *eP = ERR;
            return 0;
        }
        int curr = (int)(in[index] - '0');
        ret *= 10;
        ret += (sign * curr);
        if(ret > INT_MAX || ret < INT_MIN) {
            *eP = ERR;
            return 0;
        }
        index++;
    }
    *eP = OK;
    return (int)ret;
}
int printInt(int n) {
    char out[100];
    int len = 0;
    long nl = n;
    if (nl < 0) {
        out[len++] = '-';
        nl = -nl;
    }
    while (nl) {
        out[len++] = (char)('0' + (nl % 10));
        nl /= 10;
    }
    if (len == 0) out[len++] = '0';
    int j = (out[0] == '-' ? 1 : 0);
    int k = len - 1;
    while (j < k) {
        char temp = out[j];
        out[j++] = out[k];
        out[k--] = temp;
    }
    __asm__ __volatile__(
        "movl $1, %%eax \n\t"
        "movq $1, %%rdi \n\t"
        "syscall \n\t"
        :
        : "S"(out), "d"(len));
    return len;
}