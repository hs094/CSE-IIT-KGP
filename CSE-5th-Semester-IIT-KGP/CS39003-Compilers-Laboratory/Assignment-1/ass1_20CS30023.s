###################################################################################
###########################     Hardik Pravin Soni		###########################     
###########################         20CS30023			###########################  
###########################        Assignment-1        ############################
###########################    Comment the given code   ###########################
###################################################################################
						############### Data ###############





# Local Label:- Are a Subclass of labels. A Local Label is a number in the range of 0-99, somtimes followed by a name.
# .cfi_startproc and .cfi_endproc is used at the beginning of each function and end of each function respectively, these so-called assembler directives help the assembler to put debugging and stack unwinding information into the executable.
# PLT: is one of the structures which makes dynamic loading and linking easier to use.







	.file	"asgn1.c"									# source file name(i.e, the original file name used by debuggers)
	.text												# We write our code in the ".text" section
	.section	.rodata									# read-only data section(here 'ro' stand for read only that implies we have here a zero-terminateed string named rodata. The application will be allowed to read the data but any attempt at writing will trigger an exception)
	.align 8											# align with 8-byte boundary
.LC0:													# Label of f-string-1st printf(refer asgn1.c)
	.string	"Enter the string (all lower case): "
.LC1:													# Label of f-string scanf taking the input of the string(without spaces)
	.string	"%s"

.LC2:
	.string	"Length of the string: %d\n"
	.align 8			# Incr	<-- rax + rdx correlates to str+1*n = &str[n]ssembler Directive (see top)
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go for a valid location.
	pushq	%rbp										# Save old base pointer into rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp									# rbp <-- rsp set it as new stack pointer
	.cfi_def_cfa_register 6
	subq	$80, %rsp									# Creating Space of Size 80 bytes for Local Arrays namely, str and dest and other Variables 
	movq	%fs:40, %rax								# Access value of %fs:40 and store it in %rax
	movq	%rax, -8(%rbp)								# (rbp - 8) = rax
	xorl	%eax, %eax									# Clear it that is eax <-- 0 
	leaq	.LC0(%rip), %rdi							
	movl	$0, %eax									# eax <-- 0 clear the value of eax.(so since no floating point data is printed, so vector register is set to 0)
	call	printf@PLT									# Calls the printf function indirectly(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							
	leaq	-64(%rbp), %rax								# rax = (rbp - ) (Making space to store num)
	movq	%rax, %rsi									# rsi <-- rax
	leaq	.LC1(%rip), %rdi							# rdi <-- rsi the str in length
	movl	$0, %eax									# eax <-- 0 clear the value of eax
	call	__isoc99_scanf@PLT							# This is a function call. These functions return the number of input items succesfully matched and assigned, which can be fewer than provided for, or zero in the event of an early matching failure.
	leaq	-64(%rbp), %rax								# rax = (rbp - 32) (Making space to store str)
	movq	%rax, %rdi									# rdi <-- rax
	call	length										# Calling the Function length()
	movl	%eax, -68(%rbp)								# (rbp-68) <-- eax
	movl	-68(%rbp), %eax								# eax <-- (rbp-68)
	movl	%eax, %esi									# esi <-- eax
	leaq	.LC2(%rip), %rdi							# Printing the statment with local label .LC2
	movl	$0, %eax									# eax <-- 0
	call	printf@PLT									# Calls the printf function indirectly(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							
	leaq	-32(%rbp), %rdx								# rdx <-- (rbp-32)
	movl	-68(%rbp), %ecx								# ecx <-- (rbp-68)
	leaq	-64(%rbp), %rax								# rax <-- (rbp-64)
	movl	%ecx, %esi									# esi <-- ecx
	movq	%rax, %rdi									# rdi <-- rax
	call	sort										# Calling the function sort()
	leaq	-32(%rbp), %rax								# rax <-- (rbp-32)
	movq	%rax, %rsi									# rsi <-- rax
	leaq	.LC3(%rip), %rdi							# Printing the statment with local label .LC3
	movl	$0, %eax									# eax <-- 0
	call	printf@PLT									# Calls the printf function indirectly(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							
	movl	$0, %eax									# eax <-- 0
	movq	-8(%rbp), %rcx								# rcx <-- (rbp-8)
	xorq	%fs:40, %rcx								# Check if equal to the original value else clear it.
	je	.L3												# Jump to .L3. This Statement Instructs to jump to the local label .LC3
	call	__stack_chk_fail@PLT						# __stack_chk_fail is 'noreturn'
.L3:
	leave
	.cfi_def_cfa 7, 8
	ret													# Return statement of main ,i.e, return 0;
	.cfi_endproc										# Assembler Directive (see top)
.LFE0:
	.size	main, .-main								# Dot . means "current location". Then .-main would be the distance to the start of main, i.e, the size of main.
	.globl	length										# length is a global name			
	.type	length, @function							# This statement states that length is a function:
length:													# Function length() starts here
.LFB1:													# LFB stands for FUNC_BEGIN_LABEL, this local label defines that the function started 
	.cfi_startproc										# Assembler Directive (see top) contaning the call frame information
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go for a valid location.
	pushq	%rbp										# This step is saving old base pointer
	.cfi_def_cfa_offset 16	
	.cfi_offset 6, -16
	movq	%rsp, %rbp									# rbp = rsp, Set new stack pointer for the execution of this function
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp)								# Store the arguement passed to the function, namely, char str[20] in the register (rbp-24)							
	movl	$0, -4(%rbp)								# Set 0 as the default value of the local variable i and store it in the (rbp-4) register [i = 0]
	jmp	.L5												# Jump to .L5. Go to the beginning of the loop which is ran to calculate the length of the string
.L6:
	addl	$1, -4(%rbp)
.L5:
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movzbl	(%rax), %eax								# eax <-- rax
	testb	%al, %al									# comparing if str[i] is equal to '\0' by checking bitwise and (&) of each character. 
	jne	.L6												# goto .L6(where iterative variable i increments) unless str[i]=='\0'
	movl	-4(%rbp), %eax
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret													# Return Statement of function length
	.cfi_endproc										# Assembler Directive (see top)
	.size	length, .-length							# Dot . means "current location". Then .-length would be the distance to the start of length, i.e, the size of length.
.LFE1:
	.globl	sort										# sort is a global function
	.type	sort, @function								# sort is a function
sort:													# Function sort starts here
.LFB2:
	.cfi_startproc										# Assembler Directive (see top)
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go for a valid location.											
	pushq	%rbp										# Saves the Old base Pointer to rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp									# Stack Pointer is the new base pointer
	.cfi_def_cfa_register 6
	subq	$48, %rsp									# Create a Space for local arrays, and Variables
	movq	%rdi, -24(%rbp)								# (rbp-24) <-- rdi
	movl	%esi, -28(%rbp)								# (rbp-28) <-- esi
	movq	%rdx, -40(%rbp)								# (rbp-40) <-- rdx
	movl	$0, -8(%rbp)								# (rbp-8) = 0 store the value of i as 0
	jmp	.L9												# Jump to .L9
.L13:
	movl	$0, -4(%rbp)								# Set (rbp-4) = 0
	jmp	.L10											# Jump to local label with label .L10
.L12:
	movl	-8(%rbp), %eax								# eax <-- (rbp-8)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movzbl	(%rax), %edx								# edx <-- rax
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)	
	movslq	%eax, %rcx									# rcx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rcx, %rax									# rax += rcx
	movzbl	(%rax), %eax								# eax <-- rax
	cmpb	%al, %dl									# If the byte stored at the memory location dl==al, jump to the local label named .L11.							
	jge	.L11											# Jump to local label .L11 if the above condition is true.
	movl	-8(%rbp), %eax								# eax <-- (rbp-8)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movzbl	(%rax), %eax								# eax <-- rax
	movb	%al, -9(%rbp)								# (rbp-9) <-- al
	movl	-4(%rbp), %eax 								# eax <-- (rbp-4)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movl	-8(%rbp), %edx								# edx <-- (rbp-8)
	movslq	%edx, %rcx									# rcx <-- edx
	movq	-24(%rbp), %rdx								# rdx <-- (rbp-24)
	addq	%rcx, %rdx									# rdx += rcx
	movzbl	(%rax), %eax								# eax <-- rax
	movb	%al, (%rdx)									# rdx <-- al
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rax, %rdx									# rdx += rax
	movzbl	-9(%rbp), %eax								# eax <-- (rbp-9)
	movb	%al, (%rdx)									# rdx <-- al
.L11:
	addl	$1, -4(%rbp)								# (rbp-4) += 1
.L10:
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)
	cmpl	-28(%rbp), %eax								# If eax == (rbp-28) then execute the below statement. 
	jl	.L12											# Jump	 to local label .L12 if the above condition is true.
	addl	$1, -8(%rbp)								# (rbp-8) += 1
.L9:
	movl	-8(%rbp), %eax								# eax <-- (rbp-8)
	cmpl	-28(%rbp), %eax								# If eax == (rbp-28) then execute the below statement. 
	jl	.L13											# Jump to local label .L13 if the above condition is true.
	movq	-40(%rbp), %rdx								# rdx <-- (rbp-40)
	movl	-28(%rbp), %ecx								# ecx <-- (rbp-28)
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	movl	%ecx, %esi									# esi <-- (ecx)
	movq	%rax, %rdi									# rdi <-- rax
	call	reverse										# Calling the function reverse()
	nop													# Do nothing
	leave
	.cfi_def_cfa 7, 8
	ret													# Return Statement of reverse()
	.cfi_endproc										# Assembler Directive (see top)
.LFE2:
	.size	sort, .-sort								# Dot . means "current location". Then .-sort would be the distance to the start of sort, i.e, the size of sort.
	.globl	reverse										# reverse is a global function
	.type	reverse, @function							# reverse() is a function
reverse:												# reverse starts here
.LFB3:													
	.cfi_startproc										# Assembler Directive (see top)
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go for a valid location.
	pushq	%rbp										# Save the old base pointer
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp									# rbp <-- rsp. Root Stack poiter is the new Base pointer
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp)								# (rbp-24) <-- rdi
	movl	%esi, -28(%rbp)								# (rbp-28) <-- esi
	movq	%rdx, -40(%rbp)								# (rbp-40) <-- rdx
	movl	$0, -8(%rbp)								# Set (rbp-8) as 0. Initialising the value of i as 0. [i = 0]
	jmp	.L15											# Jump to .L15. The starting of the outer loop in reverse function.
.L20:
	movl	-28(%rbp), %eax								# eax <-- (rbp-28)
	subl	-8(%rbp), %eax								# eax -= (rbp-8)								
	subl	$1, %eax									# eax -= 1
	movl	%eax, -4(%rbp)								# (rbp-4) <-- eax
	nop													# Do nothing
	movl	-28(%rbp), %eax								# eax <-- (rbp-28)
	movl	%eax, %edx									# edx <-- eax
	shrl	$31, %edx									# Shifts the value in edx to the right by 31 bits and store in edx.									
	addl	%edx, %eax									# eax += edx
	sarl	%eax										# Shift eax to the right by 1 and preserves the sign bit.
	cmpl	%eax, -4(%rbp)								# Check if (rbp-4) == eax, if it then execute the following statement
	jl	.L18											# If the above statement is true then Jump to local label .L18
	movl	-8(%rbp), %eax								# eax <-- (rbp-8)
	cmpl	-4(%rbp), %eax								# Check if eax == (rbp-4), if it then execute the following statement
	je	.L23											# Jump to .L23
	movl	-8(%rbp), %eax								# eax <-- (rbp-8)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx 
	movzbl	(%rax), %eax								# eax <-- rax
	movb	%al, -9(%rbp)								# (rbp-9) <-- al
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movl	-8(%rbp), %edx 								# edx <-- (rbp-8)
	movslq	%edx, %rcx									# rcx <-- edx
	movq	-24(%rbp), %rdx								# rdx <-- (rbp-24)
	addq	%rcx, %rdx									# rdx += rcx
	movzbl	(%rax), %eax								# eax <-- rax
	movb	%al, (%rdx)									# rdx <-- al
	movl	-4(%rbp), %eax								# eax <-- (rbp-4)
	movslq	%eax, %rdx									# rdx <-- eax
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rax, %rdx									# rdx += rax
	movzbl	-9(%rbp), %eax								# eax <-- (rbp-9)
	movb	%al, (%rdx)									# rdx <-- al
	jmp	.L18											# Jump to .L18									
.L23:
	nop													# NOP does nothing, it is actually the break statement when i==j.
.L18:
	addl	$1, -8(%rbp)
.L15:
	movl	-28(%rbp), %eax								# eax <-- (rbp-28) , Copies value in (rbp-28) in memory to eax.
	movl	%eax, %edx									# edx <-- eax , Copies eax to edx
	shrl	$31, %edx									# Shifts the value in edx to the right by 31 bits and store in edx.
	addl	%edx, %eax									# eax += edx
	sarl	%eax
	cmpl	%eax, -8(%rbp)								# eax < (rbp-8). Indedd it is the condition where i < len/2 
	jl	.L20											# Jump to .L20. The Inner Loop.
	movl	$0, -8(%rbp)								# (rbp-8) = 0
	jmp	.L21											# Jump to .L21. The Outer Loop ends and we then move to store the values of str[i] to dest[i]
.L22:
	movl	-8(%rbp), %eax								# eax <-- (rbp-28)
	movslq	%eax, %rdx									# rdx <-- eax. movslq reads a long (32 bits) from the source, sign extends it to a qword (64 bits) writes it into the destination register.					
	movq	-24(%rbp), %rax								# rax <-- (rbp-24)
	addq	%rdx, %rax									# rax += rdx
	movl	-8(%rbp), %edx								# ed <-- (rbp-8)
	movslq	%edx, %rcx									# rcx <-- edx
	movq	-40(%rbp), %rdx								# rdx <-- (rbp-40)
	addq	%rcx, %rdx									# rdx += rcx
	movzbl	(%rax), %eax								# eax <-- rax. movzbl reads a word (16 bits) from the source register, extends that to a long (32 bits), and writes it into the destination register.
	movb	%al, (%rdx)									# rdx <-- al. The Suffix is b rather than the normal q, as it is moving a byte value from source to destination register rather than a quadword.
	addl	$1, -8(%rbp)								# (rbp-8) += 1 
.L21:
	movl	-8(%rbp), %eax								# eax <-- (rbp-8). Assign the value of 0 to i.
	cmpl	-28(%rbp), %eax								# check if eax < (rbp-28). That is check if i < len.
	jl	.L22											# Jump to .L22. Assigning the value of str[i] --> dest[i].
	nop					
	nop
	popq	%rbp										# Pop the base pointer rbp
	.cfi_def_cfa 7, 8
	ret													# Return of function reverse
	.cfi_endproc
.LFE3:
	.size	reverse, .-reverse 							# Dot . means "current location". Then .-reverse would be the distance to the start of reverse, i.e, the size of reverse.
	.ident	"GCC: (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	 1f - 0f
	.long	 4f - 1f
	.long	 5
0:
	.string	 "GNU"
1:
	.align 8
	.long	 0xc0000002
	.long	 3f - 2f
2:
	.long	 0x3
3:
	.align 8
4:
