###################################################################################
###########################     Hardik Pravin Soni		###########################     
###########################         20CS30023			###########################  
###########################        Assignment-1         ###########################
###########################    Comment the given code   ###########################
###################################################################################
					   ############### Data ###############



# Incr	<-- rax + rdx correlates to str+1*n = &str[n]ssembler Directive (see top)	
# Some Important References are given below.
# Local Label:- Are a Subclass of labels. A Local Label is a number in the range of 0-99, somtimes followed by a name.
# .cfi_startproc and .cfi_endproc is used at the beginning of each function and end of each function respectively, these so-called assembler directives help the assembler to put debugging and stack unwinding information into the executable.
# PLT:- is one of the structures which makes dynamic loading and linking easier to use.
# CFA:- A stack address serves as a unique identifier for the call frame. The Canonical Frame Location, or CFA, is the name we give to this address. The stack pointer value at the call location in the preceding frame is called the CFA.

	.file	"asgn1.c"									# source file name(i.e, the original file name used by debuggers and compilers)
	.text												# We write our code in the ".text" section
	.section	.rodata									# read-only data section(here 'ro' stand for read only that implies we have here a zero-terminateed string named rodata. The application will be allowed to read the data but any attempt at writing will trigger an exception.)
	.align 8											# align .LC0 with 8-byte boundary by bounding it's alignment
.LC0:													# Label of f-string-1st printf(refer asgn1.c)
	.string	"Enter the string (all lower case): "
.LC1:													# Label of f-string scanf taking the input of the string(without spaces) from user
	.string	"%s"
.LC2:													# Label of f-string-2nd printf(refer asgn1.c)
	.string	"Length of the string: %d\n"
	.align 8											# align .LC3 with 8-byte boundary by bounding it's alignment							
.LC3:													# Label of f-string-3rd printf 
	.string	"The string in descending order: %s\n"
	.text												# code starts
	.globl	main										# Mentions that main is a global function
	.type	main, @function								# Mentions, the type of main which is a function
main:													# start of 'main'
.LFB0:													
	.cfi_startproc										# .cfi_startproc marks the beginning of each function that should have an entry in .eh_frame. It initializes some internal data structures, emits architecture dependent initial CFI instructions.
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go to a valid location.
	pushq	%rbp										# Save %(rbp)<--root base pointer into stack
	.cfi_def_cfa_offset 16								# CFA is set at 16 bytes offset from our current memory stack pointer
	.cfi_offset 6, -16									# Here, we set the register 6 in memory at an offset of 6 bytes from our currrent stack pointer
	movq	%rsp, %rbp									# rbp <-- rsp. set %(rbp) as new stack pointer [Indirect Mode]
	.cfi_def_cfa_register 6								# Instructing that we use register 6 for computing CFA(refer top).

# char str[20],dest[20];
# int len;		
	subq	$80, %rsp									# rsp <-- M[rsp-80], Creating Space of Size 80 bytes for Local Arrays namely, 'str[20]' and 'dest[20]' and other Variables like 'len'
	movq	%fs:40, %rax								# Acsess Canary, which is a random variable used in protection against stack buffer overflow. Access value of %fs:40 and store it in %rax
	movq	%rax, -8(%rbp)								# M[rbp - 8] <-- rax , [Base-Relative Mode] pushing canary into stack base pointer [Base - Relative]
	xorl	%eax, %eax									# Clearing Canary(probably only last 32 bits are erased during the instruction)

# printf("Enter the string (all lowrer case): ");	
	leaq	.LC0(%rip), %rdi							# Load the address of .LC0(%rip) into %rdi, rdi register will act the first argument passed to function printf						
	movl	$0, %eax									# eax <-- 0 [Immediate Mode] clear the value of eax. [Immediate Mode] (Since no floating point data is printed, so vector register is set to 0)
	call	printf@PLT									# Calls the printf function indirectly(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							

# scanf("%s", str);	
	leaq	-64(%rbp), %rax								# rax <-- M[bp - 64], [Base-Relative Mode] loading the address of (rbp-64) into rax (Making space to store str)
	movq	%rax, %rsi									# rsi <-- rax, [Register Mode] rsi which is indeed str is the arguement no. 2 of the scanf function
	leaq	.LC1(%rip), %rdi							# load address of .LC1(%rip) into rdi
	movl	$0, %eax									# eax <-- 0 [Immediate Mode] clear the value of eax 
	call	__isoc99_scanf@PLT							# This is a function call to scanf("%s",str);. These functions return the number of input items succesfully matched and assigned, which can be fewer than provided for, or zero in the event of an early matching failure.

# len = length(str);	
	leaq	-64(%rbp), %rax								# rax = M[rbp - 64] (load M[rbp-64] into rax, to store str), rax now stores &str 
	movq	%rax, %rdi									# rdi <-- rax, [Register Mode] rdi (which is &str) is the 1st argument of the length function
	call	length										# Calling the Function length() with rdi as arguement, equivalent to length(str)

# printf("Length of the string: %d\n", len);	
	movl	%eax, -68(%rbp)								# M[rbp-68] <-- eax, [Base-Relative Mode] loading the address of %rax into %(rbp-68) (eax stores len)
	movl	-68(%rbp), %eax								# eax <-- M[rbp-68], [Base-Relative Mode] load address of M(rbp-68) into eax, which is rbp-68 itself (eax now stores the value of len)
	movl	%eax, %esi									# esi <-- eax, [Indirect Mode] (len), 2nd arguement to printf
	leaq	.LC2(%rip), %rdi							# Printing the statment with local label .LC2
	movl	$0, %eax									# eax <-- 0 [Immediate Mode] clear the value of eax.(Since no floating point data is printed, so vector register is set to 0)
	call	printf@PLT									# Calls the printf function indirectly with rdi, res as arguments(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							

# sort(str, len, dest);	
	leaq	-32(%rbp), %rdx								# rdx <-- M[rbp-32], load (rbp - 32) into rdx, 1st arguement of sort, namely str 
	movl	-68(%rbp), %ecx								# ecx <-- M[rbp-68], [Base-Relative Mode] load (rbp-68) into ecx, 2nd arguement of sort
	leaq	-64(%rbp), %rax								# rax <-- M[rbp-64], load (rbp-64) into rax, rax stores dest
	movl	%ecx, %esi									# esi <-- ecx, [Register Mode] load %(ecx) into %(esi), the second arguement, 2nd arguement of sort namely len
	movq	%rax, %rdi									# rdi <-- rax, [Register Mode] load %(rax) into %(rdi), the third arguement namely, dest
	call	sort										# Calling the function sort()

# printf("The string in descending order: %s\n", dest);	
	leaq	-32(%rbp), %rax								# rax <-- M[rbp-32], [Base-Relative Mode] load (rbp-32) into rax, this stores dest
	movq	%rax, %rsi									# rsi <-- rax, [Register Mode] move rax -> rsi, (rsi now stores dest), the 2nd arguement of printf
	leaq	.LC3(%rip), %rdi							# Printing the statment with local label .LC3, rdi now stores the format string, is the first argument of printf
	movl	$0, %eax									# eax <-- 0 [Immediate Mode] clear the value of eax.(Since no floating point data is printed, so vector register is set to 0)
	call	printf@PLT									# Calls the printf function indirectly(the multi-stage process can be explained in brief: We call print@plt in the PLT(Procedure Linkage Table), see top)							

# return 0;
	movl	$0, %eax									# eax <-- 0 [Immediate Mode] eax stores the return value of the main function which in this case is 0.
	movq	-8(%rbp), %rcx								# rcx <-- M[rbp-8] [Base-Relative Mode] (here rcx is storing canary)
	xorq	%fs:40, %rcx								# Xor operation is applied, if we get 0, means no overflow of the stack has occured.
	je	.L3												# Jump to .L3. This Statement Instructs to jump to the local label .L3 if no overflow of stack has occured.(incase zero is returned while taking xor above.) 
	call	__stack_chk_fail@PLT						# __stack_chk_fail is 'noreturn', means if we reach here overflow of stack has occured as the program terminates with an exception.
.L3:
	leave												# set rsp to rbp, and pop the top element of stack into rbp
	.cfi_def_cfa 7, 8									# To compute the CFA(see top), an offset of 8 is added into the register 7
	ret													# Return statement of main ,i.e, return 0; Implicitly means pop the return address from stack and transfer the control to the return address
	.cfi_endproc										# Assembler Directive (see top). the unwind entry previously opened by .cfi_startproc is closed and emitted to .eh_frame
.LFE0:
	.size	main, .-main								# Dot . means "current location". Then .-main would be the distance to the start of main, i.e, the size of main.
	.globl	length										# 'length' is a global name			
	.type	length, @function							# This statement states that 'length' is a function:

# int length(char str[20])
length:													# Function length() starts here
.LFB1:													# LFB stands for FUNC_BEGIN_LABEL, this local label defines that the function started 
	.cfi_startproc										# Assembler Directive (see top) contaning the call frame information. Initialize internal structures and emit initial CFI for entry in .eh_frame
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually terminate in 64-bit.
	pushq	%rbp										# This step is saving old base pointer(rbp) into memory stack
	.cfi_def_cfa_offset 16								# CFA is set at 16 bytes offset from our current memory stack pointer
	.cfi_offset 6, -16									# Register 6's Value is set at offset 16 from CFA
	movq	%rsp, %rbp									# rbp <-- rsp, [Register Mode] Set new stack base pointer for the execution of this function
	.cfi_def_cfa_register 6								# Instructing to use register 6 for computing CFA
	movq	%rdi, -24(%rbp)								# M[rbp-24] <-- rdi [Base-Relative Mode] Store the arguement passed to the function, namely, char str[20] in the register (rbp-24), the first arguement to function length						

# int i;
# for (i = 0; str[i] !='\0'; i++)
	movl	$0, -4(%rbp)								# M[rbp-4] <-- 0, [Immediate Mode] Set 0 as the default value of the local variable i and store it in the (rbp-4) register [i = 0]
	jmp	.L5												# Unconditional Jump to .L5. Go to the beginning of the loop which is ran to calculate the length of the string
.L6:
	addl	$1, -4(%rbp)								# M[rbp-4] <-- M[rbp-4] + 1, [Immediate Mode] increment rbp-4 by 1, equivalent to [i = i+1]
.L5:
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4], [Base-Relative Mode] move memory from M[rbp-4] to eax, now it stores i(the iterative variable)
	movslq	%eax, %rdx									# rdx <-- eax. [Register Mode] Move the value and sign from 32-bit eax register to 64-bit rdx register
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24]. [Base-Relative Mode] Move rbp-24 into rax, now rax stores 'str'
	addq	%rdx, %rax									# rax <-- rax + rdx. [Register Mode] add rax to memory location rdx & store in rax , equivalent to rax storing &str[i]
	movzbl	(%rax), %eax								# eax <-- rax, [Indirect Mode] a byte with zero extension is moved into a 32 bit register
	testb	%al, %al									# biwise AND of al with itself, setting ZF = 1). Comparing if str[i] is equal to '\0' by checking bitwise and (&) of each character. 
	jne	.L6												# Conditional Jump to .L6(where iterative variable i increments) unless str[i]=='\0'

# return i;
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4], [Base-Relative Mode] now eax stores the value in the memory (rbp-4), equivalent to eax storing i
	popq	%rbp										# pop the top register in stack into rbp
	.cfi_def_cfa 7, 8									# for computing CFA, take address from register 7 and add an offset of 8 to it
	ret													# Return statement of length ,i.e, return i; Implicitly means pop the return address from stack and transfer the control to the return address
	.cfi_endproc										# Assembler Directive (see top). Marks the end of unwind entry previously opened by .cfi_startproc. and emit it to .eh_frame

	.size	length, .-length							# Dot . means "current location". Then .-length would be the distance to the start of length, i.e, the size of length.
.LFE1:
	.globl	sort										# sort is a global function
	.type	sort, @function								# Specifies sort is a function

# void sort(char str[20], int len, char dest[20])
sort:													# Function sort starts here
.LFB2:
	.cfi_startproc										# Assembler Directive (see top) contaning the call frame information. Initialize internal structures and emit initial CFI for entry in .eh_frame
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually go to a valid location.											
	pushq	%rbp										# Saves the Old base Pointer(rbp) to stack
	.cfi_def_cfa_offset 16								# CFA is set at 16 bytes offset from our current memory stack Pointer
	.cfi_offset 6, -16									# set value of register 6 at an offset 16 from CFA
	movq	%rsp, %rbp									# rbp <-- rsp [Register Mode] Stack Pointer is the new base pointer
	.cfi_def_cfa_register 6								# Instructing to use register 6 for computing CFA

# int i, j;
# char temp;
	subq	$48, %rsp									# rsp <-- M[rsp-48] Create a Space for local arrays, and Variables namely, i,j, temp;
	movq	%rdi, -24(%rbp)								# M[rbp-24] <-- rdi, [Base-Relative Mode] (rbp-24) is now storing str
	movl	%esi, -28(%rbp)								# M[rbp-28] <-- esi, [Base-Relative Mode](rbp-28 is now storing len)
	movq	%rdx, -40(%rbp)								# M[rbp-40] <-- rdx, [Base-Relative Mode](rbp-40) is now storing dest)
	
# for (i = 0; i < len; i++)	
	movl	$0, -8(%rbp)								# M[rbp-8] <-- 0 [Immediate Mode] store the value of i as 0, i=0;
	jmp	.L9												# Jump to .L9

# for (j = 0; j < len; j++)
.L13:
	movl	$0, -4(%rbp)								# Set M[rbp-4] <-- 0, [Immediate Mode] equivalent ot j=0
	jmp	.L10											# Jump to local label with label .L10, equivalent to j=0;
.L12:
# if (str[i] < str[j])
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8] [Base-Relative Mode] (eax is now storing i, first iterative variable)
	movslq	%eax, %rdx									# rdx <-- eax, [Register Mode] rdx now stores str move and sign a value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24] [Base-Relative Mode](rax now stores i)
	addq	%rdx, %rax									# rax <-- rax + rdx [Register Mode] (rax stores str + i or &str[i])
	movzbl	(%rax), %edx								# edx <-- rax [Indirect Mode] (edx now stores str + i or str[i]) 
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4]	[Base-Relative Mode] (eax is now storing j, second iterative variable)
	movslq	%eax, %rcx									# rcx <-- eax 	[Indirect Mode] (rcx now stores j)
														# move and sign extend a value from 32-bit eax register to 64-bit rcx register
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24] [Base-Relative Mode] (rax now stores str)  
	addq	%rcx, %rax									# rax <-- rax + rcx	[Register Mode] (rax stores str + j or str[j])
	movzbl	(%rax), %eax								# eax <-- rax [Indirect Mode] (eax stores &str[j]), move a byte with zero extension into 32-bit 'eax' register to 64-bit 'rdx' register
	cmpb	%al, %dl									# Compare the value stored at the memory location  of registers edx(str[i]) with eax(str[j])							
	jge	.L11											# Jump to local label .L11 if the above condition is true for the mentioned registers:- edx >= eax ,i.e, (str[i] >= str[j]) is true.
	
# temp = str[i];	
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8], [Base-Relative Mode] (eax now stores i). 
	movslq	%eax, %rdx									# rdx <-- eax, [Register Mode] move and sign value from 32-bit eax register to 64-bit rdx register, (rdx now stores i)
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24], [Base-Relative Mode] (rax now stores str)
	addq	%rdx, %rax									# rax <-- rax + rdx, [Register Mode] (rdx stores str + i or &str[i])
	movzbl	(%rax), %eax								# eax <-- rax, [Indirect Mode] move a byte with zero extension into 32-bit eax register
	movb	%al, -9(%rbp)								# M[rbp-9] <-- al, [Base-Relative Mode] push str[i] to M[rbp-9] register
	
# str[i] = str[j];	
	movl	-4(%rbp), %eax 								# eax <-- M[rbp-4] [Base-Relative Mode] (eax stores j)
	movslq	%eax, %rdx									# rdx <-- eax [Register Mode] move and sign value from 32-bit eax register to 64-bit rdx register, now rdx stores j
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24] [Base-Relative Mode](rax now stores str)
	addq	%rdx, %rax									# rax <-- rax + rdx [Register Mode] (rax now stores str[j])
	movl	-8(%rbp), %edx								# edx <-- M[rbp-8] [Base-Relative Mode](edx now stores i)
	movslq	%edx, %rcx									# rcx <-- edx, [Register Mode] (rcx stores i) move and sign extend a value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rdx								# rdx <-- M[rbp-24] [Base-Relative Mode] (rdx stores str)
	addq	%rcx, %rdx									# rdx <-- rdx + rcx [Register Mode] (rdx stores str[i] or str + i)
	movzbl	(%rax), %eax								# eax <-- rax, [Indirect Mode] (move a byte with zero extension into 32 bit eax register (eax stores str[i]))
	movb	%al, (%rdx)									# rdx <-- al, [Register Mode] (move 1 byte from al(str[j]) to last byte of rdx(str[i])
														# (str[i]=str[j])
# str[j] = temp;
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4], [Base-Relative Mode](eax is now storing j)
	movslq	%eax, %rdx									# rdx <-- eax, [Register Mode] move and sign a value from 32-bit eax register to 64-bit rdx register
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24] [Base-Relative Mode] (rax now stores str)
	addq	%rax, %rdx									# rdx <-- rdx + rax	[Register Mode] (rdx stores str[i] or str + i)
	movzbl	-9(%rbp), %eax								# eax <-- M[rbp-9] [Base-Relative Mode] (move a byte with zero extension into 32 bit eax register (eax stores temp))
	movb	%al, (%rdx)									# rdx <-- al [Indirect Mode] M[rdx] stores address of temp
.L11:
	addl	$1, -4(%rbp)								# (rbp-4) <-- M[rbp-4] + 1, [Immediate Mode] j <-- j+1
.L10:
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4], [Base-Relative Mode] eax now stores j
# j < len	
	cmpl	-28(%rbp), %eax								# If j < len ,then execute the below statement. 
	jl	.L12											# Jump	to local label .L12 if the above condition is true.
	addl	$1, -8(%rbp)								# M[rbp-8] <-- M[rbp-8] + 1, i <-- i+1
.L9:
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8], [Base-Relative Mode] (eax now stores i)
	cmpl	-28(%rbp), %eax								# If i < len ,then execute the below statement 
	jl	.L13											# Jump to local label .L13 if the above condition is true.
	
# reverse(str, len, dest);	
	movq	-40(%rbp), %rdx								# rdx <-- M[rbp-40], [Base-Relative Mode] (rdx now stores dest)
	movl	-28(%rbp), %ecx								# ecx <-- M[rbp-28], [Base-Relative Mode] (ecx now stores len)
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24], [Base-Relative Mode] (rax now stores str)
	movl	%ecx, %esi									# esi <-- (ecx), [Register Mode] (len is stored in esi)
	movq	%rax, %rdi									# rdi <-- rax, [Register Mode] (rdi now stores str)
	call	reverse										# Calling the function reverse(), with respective arguements (str, len and dest) <-- (eax, ecx, rdx)
	nop													# Do nothing
	leave												# Set stack pointer(rsp) to base pointer(rbp), and pop the stack's top into rbp
	.cfi_def_cfa 7, 8									# For Computation of CFA(see top) take register 7 and set's it's offset at 8
	ret													# Return statement of sort ,i.e, return; Implicitly means pop the return address from stack and transfer the control to the return address
	.cfi_endproc										# Assembler Directive (see top). close the unwind entry previously opened by .cfi_startproc. and emit it to .eh_frame
.LFE2:
	.size	sort, .-sort								# Dot . means "current location". Then .-sort would be the distance to the start of sort, i.e, the size of sort.
	.globl	reverse										# reverse is a global function
	.type	reverse, @function							# reverse() is a function

# void reverse(char str[20], int len, char dest[20])
reverse:												# reverse starts here
.LFB3:													
	.cfi_startproc										# Assembler Directive (see top) contaning the call frame information. Initialize internal structures and emit initial CFI for entry in .eh_frame								# Assembler Directive (see top)
	endbr64												# It Stands for "End Branch 64 Bit". The feature is used to make sure that your indirect branches actually terminates in 64-bit.
	pushq	%rbp										# Save the old base pointer(rbp) in stack frame
	.cfi_def_cfa_offset 16								# set CFA at an offset of 16 bytes from the current stack pointer
	.cfi_offset 6, -16									# set value of register 6 at offset 16 from CFA
	movq	%rsp, %rbp									# rbp <-- rsp. Root Stack poiter is the new Base pointer
	.cfi_def_cfa_register 6								# Instructing to use register 6 for computing CFA	
	movq	%rdi, -24(%rbp)								# M[rbp-24] <-- rdi [Base-Relative Mode] (rbp-24) now stores str
	movl	%esi, -28(%rbp)								# M[rbp-28] <-- esi	[Base-Relative Mode] now stores len
	movq	%rdx, -40(%rbp)								# M[rbp-40] <-- rdx	[Base-Relative Mode] now stores dest
	
# for (i = 0; i < len / 2; i++)
# i = 0;	
	movl	$0, -8(%rbp)								# M[rbp-8] <-- 0 Set M[rbp-8] as 0. Initialising the value of i as 0. [i = 0] (rbp-8 now stores i)
	jmp	.L15											# Unconditional Jump to .L15. The starting of the outer loop in reverse function.
.L20:
# for (j = len - i - 1; j >= len / 2; j--)
# j = len - i - 1;
	movl	-28(%rbp), %eax								# eax <-- M[rbp-28] [Base-Relative Mode] (eax now stores len)
	subl	-8(%rbp), %eax								# eax <-- eax - M[rbp-8] [Base-Relative Mode] (eax stores len-i)							
	subl	$1, %eax									# eax <-- eax - 1, (eax stores len-i-1)
	movl	%eax, -4(%rbp)								# M[rbp-4] <-- eax, [Base-Relative Mode] rbp-4 stores len-i-1, (rbp - 4 = j)
	nop													# Do nothing

# j >= len / 2;	
	movl	-28(%rbp), %eax								# eax <-- M[rbp-28] [Base-Relative Mode] (eax now stores len)
	movl	%eax, %edx									# edx <-- eax [Register Mode] (edx now stores len)
	shrl	$31, %edx									# edx >> 31. Shifts the value in edx to the right by 31 bits and store in edx. Regardless to mention that edx is a 32-bit register								
														# right shifting by 31 bits tells us whether the MSB is 1 or 0 (find sign of len)
	addl	%edx, %eax									# eax <-- eax + edx, increment len if len is negative or add 0
	sarl	%eax										# eax >> 1. Shift eax to the right by 1 and preserves the sign bit. (equivalent to len = len/2)
	cmpl	%eax, -4(%rbp)								# M[rbp-4] is compared to eax, if j < len/2 : then jump to .L18
	jl	.L18											# If the above statement is true then Jump to local label .L18
	
# if (i == j)
# break;	
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8], [Base-Relative Mode] eax now stores i
	cmpl	-4(%rbp), %eax								# Check if eax == (rbp-4), if i==j: then jump to .L23
	je	.L23											# Jump to .L23

# else
# temp = str[i];	
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8] [Base-Relative Mode] (eax now stores i)
	movslq	%eax, %rdx									# rdx <-- eax [Register Mode] (rdx stores i)
														# move and sign extend a value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24], [Base-Relative Mode] rax now stores str
	addq	%rdx, %rax									# rax <-- rax + rdx, rax now stores str + i or str[i]
	movzbl	(%rax), %eax								# eax <-- rax [Indirect Mode] (move a byte with zero extension into 32 bit edx register (edx stores str + j or str[j])
	movb	%al, -9(%rbp)								# M[rbp-9] <-- al, [Base-Relative Mode] finally rbp-9 stores str[i]	

# str[i] = str[j];	
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4], [Base-Relative Mode]  (eax now stores j)
	movslq	%eax, %rdx									# rdx <-- eax, [Register Mode] rdx stores j
														# move and sign extend a value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24], [Base-Relative Mode]  (rax now stores str)
	addq	%rdx, %rax									# rax <-- rax + rdx, (rax now stores str + j or str[j])
	movl	-8(%rbp), %edx 								# edx <-- M[rbp-8]	[Base-Relative Mode]  (rdx now stores i)
	movslq	%edx, %rcx									# rcx <-- edx	[Register Mode] (rcx stores i)
														# move and sign extend a value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rdx								# rdx <-- M[rbp-24] [Base-Relative Mode] (rdx now stores str)
	addq	%rcx, %rdx									# rdx <-- rdx + rcx (rdx stores str + i or str[i])
	movzbl	(%rax), %eax								# eax <-- rax [Indirect Mode] 
														# move and sign extend a value from 32-bit eax register to 64-bit rdx register 
	movb	%al, (%rdx)									# M[rdx] <-- al, [Indirect Mode] rdx now stores str[j] (parallel to say, str[i]=str[j])
	
# str[j] = temp;	
	movl	-4(%rbp), %eax								# eax <-- M[rbp-4] [Base-Relative Mode] (eax now stores j)
	movslq	%eax, %rdx									# rdx <-- eax rdx stores i [Register Mode]
														# move and sign value from 32-bit eax register to 64-bit rdx register 
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24] [Base-Relative Mode] rax now stores str
	addq	%rax, %rdx									# rdx <-- rdx + rax (rdx stores str + j or str[j])
	movzbl	-9(%rbp), %eax								# [Base-Relative Mode] move and sign value from 32-bit eax register to 64-bit rdx register 
														# eax <-- M[rbp-9]
	movb	%al, (%rdx)									# M(rdx) <-- al, [Indirect Mode](compare to str[j] = temp)
	jmp	.L18											# Unconditional Jump to .L18									
.L23:
	nop													# NOP does nothing, it is actually the break statement when i==j.
.L18:
# i++;
	addl	$1, -8(%rbp)								# M[rbp - 8] <-- M[rbp - 8] + 1, equivalent to incrementing the [i = i + 1]
# for (j = len - i - 1; j >= len / 2; j--)
.L15:
	movl	-28(%rbp), %eax								# eax <-- M[rbp-28] , [Base-Relative Mode] Copies value in (rbp-28) in memory to eax.(eax loads len)
	movl	%eax, %edx									# edx <-- eax , [Register Mode] Copies eax to edx, edx now stores len
	shrl	$31, %edx									# edx >> 31 Shifts the value in edx to the right by 31 bits.
														# right shift edx by 31 bits, edx is a 32-bit register and 
	addl	%edx, %eax									# eax <-- eax + edx, add 1 to len if len is negative or add 0
	sarl	%eax										# eax >> 1. Shift eax to the right by 1 and preserves the sign bit. (equivalent to len/2)
	cmpl	%eax, -8(%rbp)								# eax < M[rbp-8]. Indedd it is the condition where i < len/2 
	jl	.L20											# Jump to .L20. The Inner Loop.
	movl	$0, -8(%rbp)								# (rbp-8) <-- 0, setting i to zero [i=0]
	jmp	.L21											# Jump to .L21. The Outer Loop ends and we then move to store the values of str[i] to dest[i]

.L22:
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8]  [Base-Relative Mode]  (eax now stores i)
	movslq	%eax, %rdx									# rdx <-- eax. [Register Mode] (rdx stores i)
														# movslq reads a long (32 bits) from the source, sign extends it to a qword (64 bits) writes it into the destination register.					
	movq	-24(%rbp), %rax								# rax <-- M[rbp-24], [Base-Relative Mode]  (rax stores str[20])
	addq	%rdx, %rax									# rax <-- rax + rdx (rdx stores str + i or str[i])
	movl	-8(%rbp), %edx								# edx <-- M[rbp-8] [Base-Relative Mode]  (edx stores i)
	movslq	%edx, %rcx									# rcx <-- edx  # movslq reads a long (32 bits) from the source, sign extends it to a qword (64 bits) writes it into the destination register.					
	movq	-40(%rbp), %rdx								# rdx <-- M[rbp-40] [Base-Relative Mode] (rdx register stores dest[20])
	addq	%rcx, %rdx									# rdx <-- rdx + rcx [Register Mode] (rdx register stores dest+i or dest[i])
	movzbl	(%rax), %eax								# move and sign value from 32-bit eax register to 64-bit rdx register 
														# eax <-- M[rax] [Indirect Mode]
	movb	%al, (%rdx)									# (rdx) <-- M(al) [Indirect Mode]
														# Copying dest[i] to str[i]. The Suffix is b rather than the normal q, as it is moving a byte value from source to destination register rather than a quadword.
	addl	$1, -8(%rbp)								# M[rbp-8] <-- M[rbp-8] + 1 incrementing the iterative variable [i = i+1]

# for (i = 0; i < len; i++)
.L21:
	movl	-8(%rbp), %eax								# eax <-- M[rbp-8]. [Base-Relative Mode] Now eax stores (rbp-8), hence eax stores i.
	# i < len
	cmpl	-28(%rbp), %eax								# check if eax < M[rbp-28]. That is check if i < len. [Base-Relative Mode] 
	# dest[i] = str[i];
	jl	.L22											# Jump to .L22. Assigning the value of str[i] --> dest[i].
	nop													# Do nothing
	nop													# Do nothing
	popq	%rbp										# Pop the base pointer rbp
	.cfi_def_cfa 7, 8
	ret													# Return of function reverse
	.cfi_endproc										# Assembler Directive (see top). close the unwind entry previously opened by .cfi_startproc. and emit it to .eh_frame
.LFE3:
	.size	reverse, .-reverse 							# Dot . means "current location". Then .-reverse would be the distance to the start of reverse, i.e, the size of reverse.
	.ident	"GCC: (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8                                            # align .ident with 8-byte boundary bounding it's alignment
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
