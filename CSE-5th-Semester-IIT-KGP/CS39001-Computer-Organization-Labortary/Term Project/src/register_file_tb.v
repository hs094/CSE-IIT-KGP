`timescale 1ns / 1ps

////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer:
//
// Create Date:   23:01:45 11/08/2022
// Design Name:   register_file
// Module Name:   /home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/register_file_tb.v
// Project Name:  COA_lab_Grp_60
// Target Device:  
// Tool versions:  
// Description: 
//
// Verilog Test Fixture created by ISE for module: register_file
//
// Dependencies:
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
////////////////////////////////////////////////////////////////////////////////

module register_file_tb;

	// Inputs
	reg [4:0] reg1Addr;
	reg [4:0] reg2Addr;
	reg [1:0] writeReg;
	reg [31:0] writeData;
	reg clk;
	reg rst;

	// Outputs
	wire [31:0] reg1Out;
	wire [31:0] reg2Out;
	wire [31:0] retReg;

	// Instantiate the Unit Under Test (UUT)
	register_file uut (
		.reg1Addr(reg1Addr), 
		.reg2Addr(reg2Addr), 
		.writeReg(writeReg), 
		.writeData(writeData), 
		.reg1Out(reg1Out), 
		.reg2Out(reg2Out), 
		.clk(clk), 
		.rst(rst), 
		.retReg(retReg)
	);

	always #2 clk = ~clk;
	
	initial begin
		// Initialize Inputs
		reg1Addr = 0;
		reg2Addr = 0;
		writeReg = 0;
		writeData = 0;
		clk = 0;
		rst = 0;

		$monitor ("reg0 = %d, reg1 = %d, reg2 = %d, reg3 = %d, reg31 = %d", 
			$signed(uut.registers[0]), 
			$signed(uut.registers[1]), 
			$signed(uut.registers[2]), 
			$signed(uut.registers[3]), 
			$signed(uut.registers[31])
			);
			
		// Initialize Inputs
		reg1Addr = 0;
		reg2Addr = 0;
		writeReg = 0;
		writeData = 0;
		clk = 0;
		rst = 1;
		// Wait 100 ns for global reset to finish
		#100;
        
		rst = 0;

		// Add stimulus here
		reg1Addr = 5'd1;
		reg2Addr = 5'd2;
		writeReg = 2'b10;
		writeData = 32'd16;

		#4;

		reg1Addr = 5'd2;
		reg2Addr = 5'd1;
		writeData = 32'd22;

		#4;

		reg1Addr = 5'd1;
		reg2Addr = 5'd2;
		writeReg = 2'b00;
	end
endmodule

