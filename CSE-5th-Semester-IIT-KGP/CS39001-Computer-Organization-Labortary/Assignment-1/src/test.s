#
# "Euclidean's Greatest Common Divisor Algorithm -- Assembly Version"
#
# This MIPS assembly code -- based on MIPS R3000's instruction set -- receives
# two integer inputs, finds GCD using Euclidean's Algorithm, and then prints
# out the GCD.
#
# Author: Benjapol Worakan (benwrk)
#
	.data
input_a_str:	.asciiz	"Input a: "
input_b_str:	.asciiz	"Input b: "
newline_str:	.asciiz	"\n"
space_str:	.asciiz	" "

ia:	.word	0
ib:	.word	0

	.text
	.globl main
read_input:
	la	$a0, input_a_str
	jal	prints

	la	$a0, ia
	jal	readi

	la	$a0, input_b_str
	jal	prints

	la	$a0, ib
	jal	readi

	la	$a0, ia
	jal	printi
	jal	println

	la	$a0, ib
	jal	printi
	jal	println
exit:
	li	$v0, 10
	syscall

prints:	# print_str subroutine
	li	$v0, 4
	syscall
	jr	$ra

printi:	# print_int subroutine
	li	$v0, 1
	lw	$a0, 0($a0)
	syscall
	jr	$ra

println:	# print_line subroutine
	li	$v0, 4
	la	$a0, newline_str
	syscall
	jr	$ra

printsp:	# print_space subroutine
	li	$v0, 4
	la	$a0, space_str
	syscall
	jr	$ra

readi:	# read_int subroutine
	li	$v0, 5
	syscall
	sw	$v0, 0($a0)
	jr	$ra