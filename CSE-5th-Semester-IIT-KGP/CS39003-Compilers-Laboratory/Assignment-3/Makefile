output.txt: a.out ass3_20CS30023_20CS30047_test.c
	./a.out < ass3_20CS30023_20CS30047_test.c > output.txt
a.out: lex.yy.c ass3_20CS30023_20CS30047.c
	cc lex.yy.c ass3_20CS30023_20CS30047.c -lfl
lex.yy.c: ass3_20CS30023_20CS30047.l
	flex ass3_20CS30023_20CS30047.l
ass3_20CS30023_20CS30047.c:
	touch ass3_20CS30023_20CS30047.c
clean:
	rm a.out output.txt lex.yy.c
