# Hardik Pravin Soni \
 20CS30023 \
 Compilers Labortary Assignment 2

# Create Executable file a.out to show results in console
a.out: main.o libass2_20CS30023.a
	cc main.o -L. -lass2_20CS30023 -o a.out
# It is the rule to create object file main.o from main.c
main.o: main.c myl.h
	cc -Wall -c main.c

# Create a archive library(statically linked) using object file 
libass2_20CS30023.a: ass2_20CS30023.o
	ar -rcs libass2_20CS30023.a ass2_20CS30023.o

# It is the rule to create object file ass2_20CS30023.o from ass2_20CS30023.c and it's corresponding header file myl.h
ass2_20CS30023.o: ass2_20CS30023.c myl.h
	cc -Wall -c ass2_20CS30023.c

# The Cleanup Rule: get rid of your object and executable files
clean:
	rm a.out main.o libass2_20CS30023.a ass2_20CS30023.o 




