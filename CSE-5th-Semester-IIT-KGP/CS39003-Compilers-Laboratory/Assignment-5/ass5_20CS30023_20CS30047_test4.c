// typecasting and pointers
void swapTwoNumbers(int* a, int* b) //pointers
{
    int temp = *a;
    *a = *b;
    *b = temp;
    return;
}
float areaOfCircle(int r) {
    float pi = 3.14, area;
    int rSquare = r*r;
    area = rSquare * pi; // type casting int -> float
    return area;
}
int main() {
    int a1[10], a2[10][20], a3[5][10][15];
    float *f1, **f2, ***f3;
    a1[5] = a2[1][2];
    a2[5][6] = a3[1][2][3];
    a3[0][0][0] = ***f3;
    ***f3 = **f2;
    **f2 = a2[9][19];
    *f1 = **f2;
    // swapTwoNumbers(a1[2],a2[4][9]);
    // areaOfCircle(10);
    return 0;
}
