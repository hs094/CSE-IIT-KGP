`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date:    22:56:48 11/08/2022 
// Design Name: 
// Module Name:    program_counter 
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

module program_counter(
    input [31:0] pc_in,
    input clk,
    input rst,
    output reg [31:0] pc_out
    );

    always @(posedge clk) begin
        if(rst) begin
            pc_out <= 0;
        end else begin
            pc_out <= pc_in;
        end
    end

endmodule
