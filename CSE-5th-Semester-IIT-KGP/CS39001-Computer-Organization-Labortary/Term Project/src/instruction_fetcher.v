`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date:    22:55:04 11/08/2022 
// Design Name: 
// Module Name:    instruction_fetcher 
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

module instruction_fetcher(
    input [31:0] pc,
    input clk,
    output [31:0] instr
    );

    instructions InstrROM (.clka(clk), .addra(pc[11:0]), .douta(instr));

endmodule
