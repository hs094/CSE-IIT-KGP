`timescale 1ns / 1ps

////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer:
//
// Create Date:   12:48:08 08/26/2022
// Design Name:   RCA_4_bit
// Module Name:   C:/Users/akabh/assgn3_grp60/RCA_4_bitTestBench.v
// Project Name:  assgn3_grp60
// Target Device:  
// Tool versions:  
// Description: 
//
// Verilog Test Fixture created by ISE for module: RCA_4_bit
//
// Dependencies:
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
////////////////////////////////////////////////////////////////////////////////

module RCA_4_bitTestBench;

	// Inputs
	reg [3:0] a;
	reg [3:0] b;
	reg c_in;

	// Outputs
	wire [3:0] s;
	wire c_out;

	// Instantiate the Unit Under Test (UUT)
	RCA_4_bit uut (
		.a(a), 
		.b(b), 
		.c_in(c_in), 
		.s(s), 
		.c_out(c_out)
	);

	initial begin
		 $monitor ("a = %d, b = %d, c_in = %d, s = %d, c_out = %d", a, b, c_in, s, c_out);
        // Initialize Inputs
		 a = 4'b0100; b = 4'b0100; c_in = 1;
		 #100;
		 a = 4'b0100; b = 4'b1100; c_in = 1;
		 #100;
		 a = 4'b1011; b = 4'b0110; c_in = 0;
		 #100;
		 a = 4'b0101; b = 4'b0100; c_in = 1;
	end
      
endmodule

