# ADIPCV Assignment Additional
## Hardik Soni - 20CS30023
To run the assignment, run the following command:
(Ensure the path to both the images is correct in the code):

```/bin/python3 "../Assignment 4/main.py"```

This will trigger the **tkinter** window to pop-up.
Before Running please ensure that the versions of the Libraries used are in accord with the requirements mentioned in ```requirements.txt```.
The Main pane will have three buttons:
1. ```(a) Recording a pair of corresponding points```: Implementation of Part 1, to identify pairs of corresponding points between stereo images **Baltimore_A1.jpg** and **Baltimore_A2.jpg**.
2. ```(b) Matrix Estimation```: Implementation of Part 2, will switch the GUI to different pane, containing the implementation to estimate the Homography Matrix (H), Rotation Matrix (R), and Fundamental Matrix (F).
3. ```Exit App```: Button to exit the application, will close all the windows and exit the GUI application.

The Additional Pane will have four buttons:
1. ```(i) Homography Matrix (H)```: Click this button, to view the Homography Matrix (H) induced by the plane at infinity.
2. ```(ii) Rotation matrix (R) for the Second Camera```: Click this button, to view the Rotation matrix (R) for the second camera, calculated assuming the reference camera centric coordinate system.
3. ```(iii) Fundamental Matrix (F)```: Click this button, to view the Fundamental Matrix (F). 
4. ```Back```: Click this button to go back to the main pane.

The output to the Code may be viewed in the ```Output/``` folder as well as in the GUI.
The Screenshots of the GUI may be viewd in the ```Interface/``` folder.
