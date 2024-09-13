/* 

###########################################################
#####################  ANUBHAV  DHAR  #####################
#####################  NETWORKS  LAB  #####################
#####################  ASSIGNMENT  1  #####################
#####################    20CS30004    #####################
###########################################################

*/

////////////////// EXPRESSION  EVALUATION /////////////////

/////////////////////  header  files  /////////////////////

#include <stdio.h>      // printf(), perror()
#include <stdlib.h>     // exit()
#include <string.h>     // for string functions like strlen, strcpy 
#include <unistd.h>     // for close() function
#include <sys/types.h>  //  
#include <sys/socket.h> //  
#include <netinet/in.h> //
#include <arpa/inet.h>  // the functions for establishing a connection


#define SERVER_PORT 23456
#define RES_SIZE 60
#define CHUNK_SIZE 40


/////////////////////   main starts   /////////////////////

int main(){

	// open a socket 
	int sockfd = socket(AF_INET, SOCK_STREAM, 0);

	if(sockfd < 0){
		perror("ERROR: Unable to open socket");
		exit(0);
	}


	struct sockaddr_in server_addr;

	// specifying  the server attributes
	server_addr.sin_family = AF_INET;
	server_addr.sin_port = htons(SERVER_PORT);
	inet_aton("127.0.0.1", &server_addr.sin_addr);

	// connecting to server
	if(connect(sockfd, (struct sockaddr *) &server_addr, sizeof(server_addr)) < 0){
		perror("ERROR: Unable to connect to server");
		exit(0);
	}

	while(1){
		// taking input
		char * buff = (char *)malloc(sizeof(char) * 2);
		int buffsize = 2, inpt = 0;
		printf("Enter the expression in one line (enter \"-1\" to terminate):\n");
		char c = 'y';
		while(c != '\n'){
			c = getchar();
			++inpt;
			if(inpt > buffsize){ // reallocate double size
				char * temp = buff;
				buffsize *= 2;
				buff = (char *) malloc (sizeof(char) * buffsize);
				for(int i = 0; 2 * i < buffsize; ++i){
					buff[i] = temp[i];
				}
				free(temp);
			}
			buff[inpt - 1] = (c == '\n') ? '\0' : c;
		}
		// The above loop was amortized O(n), n being the number of characters in the input

		// and sending it to server
		int n = strlen(buff);
		if(n == 2 && buff[0] == '-' && buff[1] == '1'){ // terminate if "-1" is input
			buff[0] = buff[1] = '?';
			int x = send(sockfd, buff, 3, 0);
			break;
		}

		// fprintf(stderr, "sending:\n%s\n(%d+ bytes)\n", buff, n);
		for(int i = 0; i <= n; i += CHUNK_SIZE){
			int x = send(sockfd, buff + i, (i + CHUNK_SIZE <= n) ? CHUNK_SIZE : (n - i + 1), 0);
			// fprintf(stderr, "sent %d bytes\n", x);
		}

		// getting result from server
		free(buff);
		buff = (char *)malloc(sizeof(char) * RES_SIZE);
		recv(sockfd, buff, RES_SIZE, 0);

		// printing the message from the server 
		printf("\t= %s\n", buff);

		free(buff);
	}
	// closing the socket
	close(sockfd);

	return 0;

}