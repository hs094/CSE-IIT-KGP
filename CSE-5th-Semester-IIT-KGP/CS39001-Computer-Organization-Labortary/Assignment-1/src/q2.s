    .globl main
    .data
str1: 
    .asciiz "Enter the first positive integer: "
str2: 
    .asciiz "Enter the second positive integer: "
str3: 
    .asciiz "GCD of the two integers is: "
error:
	.asciiz "Invalid Number!! "
newline: 
    .asciiz "\n"
    .text
# ---------------------------------------------------------
# Receiving two integer inputs from user
# ---------------------------------------------------------
main:  
    li $v0, 4              # load I/O code for string output
    la $a0, str1           # load str1 address into $a0
    syscall                # output str1
    li $v0, 5              # load I/O code for integer input
    syscall                # input integer n1 into $v0
    move $a1 $v0           # move first positive integer into $s0
    li $v0, 4              # load I/O code for string output
    la $a0, str2           # load str2 address into $a0
    syscall                # output str2
    li $v0, 5              # load I/O code for integer input
    syscall                # input integer n2 into $v0
    move $a2 $v0           # moven second positive integer into $s1
# ---------------------------------------------------------
# Calling gcd -> need to preserve arguments for lcm
# ---------------------------------------------------------
    jal gcd                # jump to subrotine gcd

    li $v0 10              # load code for code termination
    syscall                # code terminates


gcd:                       # defining subrotine gcd
   beq $s1 







# Exit Instructions	
Exit:
	li $v0, 10
	syscall # exit