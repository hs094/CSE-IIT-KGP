int mod = 100000007;
int binpow(int a, int b) {
	int res = 1;
	while(b != 0) {
		if((b & 1) != 0) 
			res = (res * a) % mod;
		a = (a * a) % mod;
		b = (b >> 1);
	}
	return res;
}

int gcd(int a, int b) {
    if(b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    int a = 9, b = 3;
    gcd(a, b);
    binpow(++a, b++);
    return 0;
}
