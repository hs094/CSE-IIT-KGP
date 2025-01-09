# ---------------------------------------------------------
# COMPUTER ORGANIZATION AND ARCHITECTURE LABORTARY
# LAB Assignment 1
# Group No. 60
# Abhay Keshari 20CS10001
# Hardik Soni 20CS30023
# Question No. 4
# ---------------------------------------------------------
    .globl main
    .data 
str1:
    .asciiz "Enter a positive integer: "
var_is_perfect:
    .asciiz "Entered number is a perfect number."
var_is_not_perfect:
    .asciiz "Entered number is not a perfect number."
error:
    .asciiz "INVALID NUMBER !! Entered Number is NOT positive."
newline:
    .asciiz "\n"
    .text
# ---------------------------------------------------------
# Taking the integer as input from the user
# ---------------------------------------------------------

main:
    li $v0, 4              # load I/O for string output
    la $a0, str1           # load str1 address into $a0
    syscall                # output str1
    li $v0, 5              # load I/O for integer input
    syscall                # integer input n into $v0
    move $s0, $v0          # move integer input from $v0 to variable $s0
    #--------------------------------------------
    # Doing Sanity Check if the entered number is less than 1 then we print an error message.
    # -------------------------------------------
    blt $s0, 1, Error
    li $s1, 1              # Loading temporary variable $i with initial value = 1
    li $s2, 0             # Creating temporary variable $sum with initial value = 0
    loopPerfect:
        beq $s1, $s0, check      
        div $s0, $s1               
        mfhi $s3
        beq $s3, $0, add1
        addi $s1, $s1, 1
        b loopPerfect
    jal exit
check:
    # li $t2, $s0
    move $t2, $s0 
    add $t2, $t2, $s0
    beq $s2, $s0, isPerfect
    b isNotPerfect
add1:
    add $s2, $s1, $s2
    addi $s1, $s1, 1
    b loopPerfect
# ---------------------------------------------------------
# Displaying if the inputted integer is NOT Perfect.
# ---------------------------------------------------------
isNotPerfect:

    li $v0, 4               # load I/O code for string output
    la $a0, var_is_not_perfect # load var_is_not_perfect address into $a0
    syscall                 # output var_is_not_perfect to console
    li $v0, 5               # load I/O code for string output
    la $a0, newline         # load newline address into $a0
    syscall                 # output newline to console
    b exit                  # Branch to Exit.
# ---------------------------------------------------------
# Displaying if the inputted integer is Perfect.
# ---------------------------------------------------------
isPerfect:
    li $v0, 4              # load I/O for string output
    la $a0, var_is_perfect # load var_is_perfect address into $a0
    syscall                # output var_is_perfect
    li $v0, 5              # load I/O for string output
    la $a0, newline        # load newline address into $a0
    syscall                # output newline to console
    b exit                 # branch to Exit.
# ---------------------------------------------------------
# Printing the Error statement if the number is negative
# ---------------------------------------------------------
Error:
    li $v0, 4              # load I/O for string output
    la $a0, error          # load error address into $a0
    syscall                # print error
    li $v0, 4              # load I/O for string output
    la $a0, newline        # load newline address into $a0
    syscall                # print newline
    b exit                 # Branch to Exit
# ---------------------------------------------------------
# Gracefully Exit the Program
# ---------------------------------------------------------
exit:
    li $v0, 10             # Exit Instructions
    syscall                # Exit Program