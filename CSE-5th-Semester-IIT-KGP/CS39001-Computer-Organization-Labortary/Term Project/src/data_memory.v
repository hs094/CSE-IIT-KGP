`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date:    22:54:19 11/08/2022 
// Design Name: 
// Module Name:    data_memory 
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

module data_memory(
    input [31:0] address,
    input clk,
    input enable,
    input write_enable,
    input [31:0] write_data,
    output [31:0] data_out
    );
	
	datastore DataRAM (.clka(~clk), .ena(enable), .wea(write_enable), .addra(address[11:0]), .dina(write_data), .douta(data_out));

endmodule
