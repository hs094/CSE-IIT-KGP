`timescale 1ns / 1ps

////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer:
//
// Create Date:   23:20:01 11/08/2022
// Design Name:   KGP_RISC
// Module Name:   /home/nikhil/Desktop/COA_Lab_Grp_60/COA_lab_Grp_60/KGP-RISC_tb.v
// Project Name:  COA_lab_Grp_60
// Target Device:  
// Tool versions:  
// Description: 
//
// Verilog Test Fixture created by ISE for module: KGP_RISC
//
// Dependencies:
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
///////////////////////////////////////////////////////////////////////////////

module KGP_RISC_tb;

	// Inputs
	reg clk;
	reg rst;
	
	// Outputs
	wire [31:0] retReg;

	// Instantiate the Unit Under Test (UUT)
	KGP_RISC uut (
		.clk(clk), 
		.rst(rst),
		.retReg(retReg)
	);
	
	initial begin
	
		/*$monitor("reg0 = %d\t, reg1 = %d\t, reg2 = %d\t, reg3 = %d\t, reg4 = %d\t, reg5 = %d\t, reg6 = %d\t, reg11 = %d\t, reg12 = %d\t", 
			$signed(uut.RF.registers[0]), 
			$signed(uut.RF.registers[1]), 
			$signed(uut.RF.registers[2]), 
			$signed(uut.RF.registers[3]), 
			$signed(uut.RF.registers[4]),
			$signed(uut.RF.registers[5]),
			$signed(uut.RF.registers[6]), 
			$signed(uut.RF.registers[11]), 
			$signed(uut.RF.registers[12])
			);*/
			
			$monitor("Return value: ", $signed(retReg));
		
		// Initialize Inputs
		clk = 0;
		rst = 1;

		// Wait 10 ns for global reset to finish
		#10;
        
		// Add stimulus here
		rst = 0;

	end
     always #2 clk = ~clk; 
endmodule