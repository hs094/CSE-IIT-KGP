
Instruction subleq b, a, c
    Mem[a] = Mem[a] - Mem[b]
    if (Mem[a] ≤ 0)
        goto c



#  ----------------------------------------------------------------------------------------------------

preproccessing:
    subleq Z, Z                 # Z <= 0
    subleq a, Z, store_prev     # jumps to store_prev if a >= 0

#   Z <= 0
#   moves to store_prev if a >= 0 else proceeds to swap_sign

swap_sign:

    subleq Z, Z                 # Z <= 0
    subleq a, Z                 # Z <= -a
    subleq a, a                 # a <= 0
    subleq c, c                 # c <= 0
    subleq Z, c                 # c <= a
    subleq c, a                 # a <= -a

    subleq Z, Z                 # Z <= 0
    subleq c, c                 # c <= 0
    subleq b, Z                 # Z <= -b
    subleq b, b                 # b <= 0
    subleq Z, c                 # c <= b
    subleq c, b                 # b <= -b
    subleq c, c                 # c <= 0
    subleq Z, Z                 # Z <= 0

#   c <= 0
#   a <= -a
#   b <= -b
#   Z <= 0
#   swaps sign of a and b and proceeds to store_prev 
#   resets value of c and Z

store_prev:

    subleq c, c                 # c <= 0
    subleq a, Z                 # Z <= -a
    subleq Z, c                 # c <= a
    subleq Z, Z                 # Z <= 0

    subleq d, d                 # d <= 0
    subleq b, Z                 # Z <= -b
    subleq Z, d                 # d <= b
    subleq Z, Z                 # Z <= 0

    subleq b, b                 # b <= 0

#   c <= a
#   d <= b
#   Z <= 0
#   a <= a
#   b <= 0
#   stores a and b in c and d respectively and proceeds to multiply
#   resets value of Z and sets b to 0

multiply:

    subleq Z, Z                 # Z <= 0
    subleq 1, a, finished       # jumps to finished if a-1 <= 0
# addition loop
    subleq d, Z                 # Z <= -d
    subleq Z, b                 # b <= b+d
    subleq Z, Z                 # Z <= 0
# loop line
    subleq Z, Z, multiply       # jumps to multiply 

#   Z <= 0
#   b <= b*a
#   a <= 0
#   jumps to finished after muliplying a and b

finished:

    subleq Z, Z                 # Z <= 0
    subleq c, Z                 # Z <= -a
    subleq Z, a                 # a <= a
    subleq Z, Z                 # Z <= 0

#   a <= a
#   Z <= 0
#   resets value of a to original value and ends program