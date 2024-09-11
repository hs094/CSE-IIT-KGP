parser.out: lex.yy.o y.tab.o ass6_20CS30023_20CS30047_translator.o ass6_20CS30023_20CS30047_target_translator.o
	g++ lex.yy.o y.tab.o ass6_20CS30023_20CS30047_translator.o ass6_20CS30023_20CS30047_target_translator.o -lfl -o parser.out

ass6_20CS30023_20CS30047_target_translator.o: ass6_20CS30023_20CS30047_target_translator.cxx ass6_20CS30023_20CS30047_translator.h
	g++ -c ass6_20CS30023_20CS30047_target_translator.cxx

ass6_20CS30023_20CS30047_translator.o: ass6_20CS30023_20CS30047_translator.cxx ass6_20CS30023_20CS30047_translator.h
	g++ -c ass6_20CS30023_20CS30047_translator.cxx

lex.yy.o: lex.yy.c
	g++ -c lex.yy.c

y.tab.o: y.tab.c
	g++ -c y.tab.c

lex.yy.c: ass6_20CS30023_20CS30047.l y.tab.h ass6_20CS30023_20CS30047_translator.h
	flex ass6_20CS30023_20CS30047.l

y.tab.c y.tab.h: ass6_20CS30023_20CS30047.y
	bison -dty --report=all ass6_20CS30023_20CS30047.y

libass6_20CS30023_20CS30047.a: ass6_20CS30023_20CS30047_main.o
	ar -rcs libass6_20CS30023_20CS30047.a ass6_20CS30023_20CS30047_main.o

ass6_20CS30023_20CS30047.o: ass6_20CS30023_20CS30047_main.c myl.h
	gcc -c ass6_20CS30023_20CS30047_main.c

clean:
	rm libass6_20CS30023_20CS30047.a ass6_20CS30023_20CS30047_main.o parser.out ass6_20CS30023_20CS30047_translator.o ass6_20CS30023_20CS30047_target_translator.o lex.yy.* y.tab.* y.output ./BINs/test* ./ASMs/ass6_20CS30023_20CS30047_test* ./TACs/ass6_20CS30023_20CS30047_quads*

test: parser.out libass6_20CS30023_20CS30047.a
	@echo "Generating assembly files\n"
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test1 > ass6_20CS30023_20CS30047_quads1.out
	mv ass6_20CS30023_20CS30047_quads1.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test1.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test2 > ass6_20CS30023_20CS30047_quads2.out
	mv ass6_20CS30023_20CS30047_quads2.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test2.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test3 > ass6_20CS30023_20CS30047_quads3.out
	mv ass6_20CS30023_20CS30047_quads3.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test3.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test4 > ass6_20CS30023_20CS30047_quads4.out
	mv ass6_20CS30023_20CS30047_quads4.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test4.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test5 > ass6_20CS30023_20CS30047_quads5.out
	mv ass6_20CS30023_20CS30047_quads5.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test5.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test6 > ass6_20CS30023_20CS30047_quads6.out
	mv ass6_20CS30023_20CS30047_quads6.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test6.s ./ASMs
	./parser.out ./TESTs/ass6_20CS30023_20CS30047_test7 > ass6_20CS30023_20CS30047_quads7.out
	mv ass6_20CS30023_20CS30047_quads7.out ./TACs
	mv ./TESTs/ass6_20CS30023_20CS30047_test7.s ./ASMs
	@echo "Compiling assembly files\n"
	gcc ./ASMs/ass6_20CS30023_20CS30047_test1.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test1
	mv test1 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test2.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test2
	mv test2 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test3.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test3
	mv test3 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test4.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test4
	mv test4 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test5.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test5
	mv test5 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test6.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test6
	mv test6 ./BINs
	gcc ./ASMs/ass6_20CS30023_20CS30047_test7.s -L. -lass6_20CS30023_20CS30047 -no-pie -o test7
	mv test7 ./BINs
	@echo "Binaries generated. Run using ./test<num>\n\n"
	@echo "RUNNING TEST 1:\n"
	@./BINs/test1
	@echo "RUNNING TEST 2:\n"
	@./BINs/test2
	@echo "RUNNING TEST 3:\n"
	@./BINs/test3
	@echo "RUNNING TEST 4:\n"
	@./BINs/test4
	@echo "RUNNING TEST 5:\n"
	@./BINs/test5
	@echo "RUNNING TEST 6:\n"
	@./BINs/test6
	@echo "RUNNING TEST 7:\n"
	@./BINs/test7
