`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date:    22:58:15 11/08/2022 
// Design Name: 
// Module Name:    write_data_selector 
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
`timescale 1ns / 1ps

//////////////////////////////////////////////////////////////////////////////////
// Assignment Number: 7 [KGP-RISC]
// Module: Write Data Selctor
// Semester Number: 5
// Group Number: G1
// Group Members: Animesh Jha (19CS10070) and Nisarg Upadhyaya (19CS30031)
//////////////////////////////////////////////////////////////////////////////////

module mem_reg_pc_selector(
    input [1:0] mem_reg_pc,
    input [31:0] mem_in,
    input [31:0] reg_in,
    input [31:0] pc_in,
    output reg [31:0] write_data
    );
	
	always @(*) begin
		case(mem_reg_pc)
			2'b01:
				begin
					write_data <= mem_in;
				end
			2'b10:
				begin
					write_data <= pc_in;
				end
			default:
				begin
					write_data <= reg_in;
				end
		endcase
	end

endmodule
