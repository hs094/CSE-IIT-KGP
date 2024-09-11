parser.out: lex.yy.o y.tab.o ass5_20CS30023_20CS30047_translator.o
	g++ lex.yy.o y.tab.o ass5_20CS30023_20CS30047_translator.o -lfl -o parser.out

ass5_20CS30023_20CS30047_translator.o: ass5_20CS30023_20CS30047_translator.cxx ass5_20CS30023_20CS30047_translator.h
	g++ -c ass5_20CS30023_20CS30047_translator.cxx

lex.yy.o: lex.yy.c
	g++ -c lex.yy.c

y.tab.o: y.tab.c
	g++ -c y.tab.c

lex.yy.c: ass5_20CS30023_20CS30047.l y.tab.h ass5_20CS30023_20CS30047_translator.h
	flex ass5_20CS30023_20CS30047.l

y.tab.c y.tab.h: ass5_20CS30023_20CS30047.y
	bison -dty --report=all ass5_20CS30023_20CS30047.y

clean:
	rm parser.out ass5_20CS30023_20CS30047_translator.o lex.yy.* y.tab.* y.output

test: parser.out
	@echo "Running test 1 (Arithmetic, shift, and bit expressions)"
	./parser.out < ass5_20CS30023_20CS30047_test1.c > ass5_20CS30023_20CS30047_quads1.txt
	@echo "Test 1 complete\n"

	@echo "Running test 2 (Unary expressions and operators)"
	./parser.out < ass5_20CS30023_20CS30047_test2.c > ass5_20CS30023_20CS30047_quads2.txt
	@echo "Test 2 complete\n"

	@echo "Running test 3 (Relational and boolean operators with if-else blocks)"
	./parser.out < ass5_20CS30023_20CS30047_test3.c > ass5_20CS30023_20CS30047_quads3.txt
	@echo "Test 3 complete\n"

	@echo "Running test 4 (Arrays and pointers)"
	./parser.out < ass5_20CS30023_20CS30047_test4.c > ass5_20CS30023_20CS30047_quads4.txt
	@echo "Test 4 complete\n"

	@echo "Running test 5 (Declarations and assignments)"
	./parser.out < ass5_20CS30023_20CS30047_test5.c > ass5_20CS30023_20CS30047_quads5.txt
	@echo "Test 5 complete\n"

	@echo "Running test 6 (Loops)"
	./parser.out < ass5_20CS30023_20CS30047_test6.c > ass5_20CS30023_20CS30047_quads6.txt
	@echo "Test 6 complete\n"

	@echo "Running test 7 (Function calls)"
	./parser.out < ass5_20CS30023_20CS30047_test7.c > ass5_20CS30023_20CS30047_quads7.txt
	@echo "Test 7 complete\n"

	@echo "Running test 8 (General file)"
	./parser.out < ass5_20CS30023_20CS30047_test8.c > ass5_20CS30023_20CS30047_quads8.txt
	@echo "Test 8 complete\n"
	
test_clean:
	rm ass5_20CS30023_20CS30047_quads1.txt ass5_20CS30023_20CS30047_quads2.txt ass5_20CS30023_20CS30047_quads3.txt ass5_20CS30023_20CS30047_quads4.txt ass5_20CS30023_20CS30047_quads5.txt ass5_20CS30023_20CS30047_quads6.txt ass5_20CS30023_20CS30047_quads7.txt ass5_20CS30023_20CS30047_quads8.txt