// declarations ( variables(int, float, char), 1D array, 2D array, functions) and arithmetic operations
// global declarations
float d = 2.3;
int s, w[10];                            
char c;     
int fun(int a){
    // nested blocks
    int m;
    m = 1;
    {
        int n;
        n = 2;
        {
            int o;
            o = 3;
            {
                int p;
                p = 4;
                {
                    int q;
                    q = 1<2?1:2;
                }
            }
        }
    }
}
void main()
{
    // Variable Declaration
    int x=120;
    int y=17,i,j,k,l,m,n,o;
    char ch='c', d = 'a';                // character definitions
    int n1, n2, n3;
    float f1, f2, f3;
    n1 = n2 << 2;
    n2 = n1 >> 2;
    n3 = n1 * n2 / f3;
    f2 = f1 + (-n2 - n3) * f1;
    n1 = n2 ^ n3;
    n2 = (n1 & n2) | n3;
    n3 = n1 & (n2 | n3);
    // Arithmetic Operations
    i = x+y;
    j = x-y;
    k = x*y;
    l = x/y;
    m = x%y;
    n = x&y;
    o = x|y;
    y = i<<2;
    x = i>>1;
    return 0;
}