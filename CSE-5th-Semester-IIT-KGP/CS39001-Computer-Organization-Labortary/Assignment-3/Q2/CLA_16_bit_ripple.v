`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date:    10:56:21 08/31/2022 
// Design Name: 
// Module Name:    CLA_16_bit_ripple 
// Project Name: 
// Target Devices: 
// Tool versions: 
// Description: 
//
// Dependencies: 
//
// Revision: 
// Revision 0.01 - File Created
// Additional Comments: 
//
//////////////////////////////////////////////////////////////////////////////////
/*
# ---------------------------------------------------------
    # COMPUTER ORGANIZATION LABORATORY
    # AUTUMN SEMESTER 2022
    # Assignment 3
    # Problem 2
    # Group No. 60
    # Abhay Kumar Keshari 20CS10001
    # Hardik Soni 20CS30023
# ---------------------------------------------------------
*/

module CLA_16_bit_ripple(
	 input [15:0] a,
    input [15:0] b,
    input c_in,
    output [15:0] s,
    output c_out
    );
	
	wire [3:1] carry; // wires for rippling internal carries
	
	// 16 bit adder by cascading 4 4bit CLAs and ripple the carry
	CLA_4_bit cla0(.a(a[3:0]), .b(b[3:0]), .c_in(c_in), .s(s[3:0]), .c_out(carry[1]));
	CLA_4_bit cla1(.a(a[7:4]), .b(b[7:4]), .c_in(carry[1]), .s(s[7:4]), .c_out(carry[2]));
	CLA_4_bit cla2(.a(a[11:8]), .b(b[11:8]), .c_in(carry[2]), .s(s[11:8]), .c_out(carry[3]));
	CLA_4_bit cla3(.a(a[15:12]), .b(b[15:12]), .c_in(carry[3]), .s(s[15:12]), .c_out(c_out));

endmodule
