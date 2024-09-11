# ADIPCV Assignment 3
## Group K - 20CS30023 19CS30023

To run the program run:

```/bin/python3 "../Assignment 3/main.py"```

This will trigger the **tkinter** window to pop-up.
Before Running please ensure that the versions of the Libraries used are in accord with the requirements mentioned in ```requirements.txt```.
The GUI has two radiobuttons:-
1. ```Line```: This drawing mode is selected to draw a line.
2. ```Point```: This drawing mode is selected to draw a point.

After clicking a point which is in the canvas of the image a pop-up displays its pixel coordinates, after drawing a valid line that lies on the canvas of the image another pop-up displays the length of the line in pixels.

By default it is in Point drawing mode.

The GUI also has following buttons:-
1. ```Open Image```: After opening the GUI, user needs to open the image on which the operations will need to be performed. This button will pop-up a file-dialog, where-in you must select a **.jpeg**, **.png**, **.jpg** Image. Note:- For some of the features the values(points, lines etc.) are hardcoded according to **Sheephard_Iasi.jpg**, if you are using a different image, change them accordingly. 
2. ```Refresh```: After clicking the refresh button all the drawn points and drawn lines previously are all erased/deleted from memory(disk). 
3. ```Exit App```: Button to exit the GUI.
4. ```Calculate Pixel Coordinate```: Button to display the pixel coordinates of the last drawn point.
5. ```Calculate Line Length```: Button to display the line length of the last drawn line.
6. ```Compute Dual Conic```: Button to Compute the transformed dual conic at infinity using the minimum five different pairs of lines, which are supposed to be perpendicular in the original painting. (hardcoded into code).
7. ```Homography Matrice```: To Compute Homography matrices for mapping the painting to a target rectangle of the aspect ratio 2:3 and 3:4, respectively, also displays the transformed images. 
8. ```Affine Rectification```: To Perform affine rectification on the painting by using calculated transformation matrix and also display as well as

The Prompts to the operation are displays in the Terminal (as well as the GUI) with Appropriate Messages. The transformed images are stored in the ```../Output/``` folder.
