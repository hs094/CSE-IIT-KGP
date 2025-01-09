# ---------------------------------------------------------
# COMPUTER ORGANIZATION AND ARCHITECTURE LABORATORY
# LAB Assignment 1
# Group No. 60
# Abhay Keshari 20CS10001
# Hardik Soni 20CS30023
# Question No. 3
# ---------------------------------------------------------
    .globl main
    .data
str1:
    .asciiz "Enter a positive integer greater than equals to 10: "
var_is_prime:
    .asciiz "Entered number is a PRIME number."
var_is_not_prime:
    .asciiz "Entered number is a COMPOSITE number."
error:
    .asciiz "INVALID NUMBER !! Entered Number is Less than 10."
newline:
    .asciiz "\n"
    .text
# ---------------------------------------------------------
# Taking the integer as input from the user
# ---------------------------------------------------------
main:
    li $v0, 4              # load I/O code for string output
    la $a0, str1           # load str1 address into $a0
    syscall                # output str1
    li $v0, 5              # load I/O code for integer input
    syscall                # input integer n is into $v0
    move $s0, $v0          # move integer input from $v0 to variable $s0
    #--------------------------------------------
    # Doing Sanity Check if the entered number is less than 10 then we print an error message.
    # -------------------------------------------
    blt $s0, 10, Error     
    li $t0, 2              # Loading temporary variable $t0 with initial value = 2 
    # ---------------------------------------------------------
    # Running the Loop to check if the entered number is Prime or Not.
    # ---------------------------------------------------------
    loopPrime: 
        beq $t0, $s0, isPrime # Checking if t0==s0 and it has no other factor, then Printing the result of the number being prime 
        div $s0, $t0          # Successfully dividing the input number by $t0 which is in the range [2,n]
        mfhi $t1              # Move the division remainder into the temporary variable $t1
        beq $t1, $0, isNotPrime # Print the result of the number being not prime
        addi $t0, $t0, 1      # Incrementing the loop interative variable
        b loopPrime           # Running the Loop to next Iteration.
    jal exit                  # Exit the program.
# ---------------------------------------------------------
# Printing the Error statement if the number is less than 10
# ---------------------------------------------------------
Error:
    li $v0, 4               # load I/O code for string output
    la $a0, error           # load error address into $a0
    syscall                 # output error
    li $v0, 5               # load I/O code for string output
    la $a0, newline         # load newline address into $a0
    syscall                 # output newline
    b exit                  # Branch to Exit.
# ---------------------------------------------------------
# Displaying if the inputted integer is NOT Prime.
# ---------------------------------------------------------
isNotPrime:
    li $v0, 4               # load I/O code for string output
    la $a0, var_is_not_prime # load var_is_not_prime address into $a0
    syscall                 # output var_is_not_prime to console
    li $v0, 5               # load I/O code for string output
    la $a0, newline         # load newline address into $a0
    syscall                 # output newline to console
    b exit                  # Branch to Exit.       
# ---------------------------------------------------------
# Displaying if the inputted integer is Prime.
# ---------------------------------------------------------
isPrime:
    li $v0, 4               # load I/O code for string output
    la $a0, var_is_prime    # load var_is_prime address into $a0
    syscall                 # output var_is_prime to console
    li $v0, 5               # load I/O code for string output
    la $a0, newline         # load newline address into $a0
    syscall                 # output newline
    b exit                  # Branch to Exit. 
# ---------------------------------------------------------
# Gracefully Exit the Program
# ---------------------------------------------------------
exit:
   li $v0, 10              # Exit Instructions
   syscall                 # exit program