####### REQUIRED IMPORTS FROM THE PREVIOUS ASSIGNMENT #######
from socket import MsgFlag
from my_package.model import InstanceSegmentationModel
from my_package.data import Dataset
from my_package.analysis import plot_visualization
from my_package.data.transforms import FlipImage, RescaleImage, BlurImage, CropImage, RotateImage
from PIL import Image

####### ADD THE ADDITIONAL IMPORTS FOR THIS ASSIGNMENT HERE #######
from functools import partial
from tkinter import *
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import numpy as np

# Define the function you want to call when the filebrowser button is clicked.
def fileClick(clicked, dataset, segmentor, img_path):

	####### CODE REQUIRED (START) #######
	# This function should pop-up a dialog for the user to select an input image file.
	# Once the image is selected by the user, it should automatically get the corresponding outputs from the segmentor.
	# Hint: Call the segmentor from here, then compute the output images from using the `plot_visuali  zation` function and save it as an image.
	# Once the output is computed it should be shown automatically based on choice the dropdown button is at.
	# To have a better clarity, please check out the sample video.
	seg_list = []
	dialogName = filedialog.askopenfilename(filetypes=[('JPG Files','*.jpg'),('PNG Files','*.png'),('JPEG Files','*.jpeg')])
	print(dialogName.title())
	img_path["path"] = dialogName  
	IMG = Image.open(dialogName)
	#scaling the image b/w [0,1] 
	image = np.array(IMG)/255
	image = np.rollaxis(IMG, 2, 0)
	seg_list.append(segmentor(input=image))
	plot_visualization(IMG,seg_list,"output/")
	print("The Output has been generated successfully!!")
	####### CODE REQUIRED (END) #######

# `process` function definition starts from here.
# will process the output when clicked.
def process(clicked, img_path):

	####### CODE REQUIRED (START) #######
	# Should show the corresponding segmentation or bounding boxes over the input image wrt the choice provided.
	# Note: this function will just show the output, which should have been already computed in the `fileClick` function above.
	# Note: also you should handle the case if the user clicks on the `Process` button without selecting any image file.
	global photo
	global photo2
	if img_path["path"] is None:
		error = Label(text="The Given Image Does not Exist.")
		error.grid(row =2, column =0)
		return
	image = Image.open(img_path["path"])
     
     
	####### CODE REQUIRED (END) #######

# `main` function definition starts from here.
if __name__ == '__main__':

	####### CODE REQUIRED (START) ####### (2 lines)
	# Instantiate the root window.
	# Provide a title to the root window.
	
	####### CODE REQUIRED (END) #######

	# Setting up the segmentor model.
	annotation_file = './data/annotations.jsonl'
	transforms = []

	# Instantiate the segmentor model.
	segmentor = InstanceSegmentationModel()
	# Instantiate the dataset.
	dataset = Dataset(annotation_file, transforms=transforms)

	
	# Declare the options.
	options = ["Segmentation", "Bounding-box"]
	clicked = StringVar()
	clicked.set(options[0])

	e = Entry(root, width=70)
	e.grid(row=0, column=0)

	####### CODE REQUIRED (START) #######
	# Declare the file browsing button

	####### CODE REQUIRED (END) #######

	####### CODE REQUIRED (START) #######
	# Declare the drop-down button

	####### CODE REQUIRED (END) #######

	# This is a `Process` button, check out the sample video to know about its functionality
	myButton = Button(root, text="Process", command=partial(process, clicked))
	myButton.grid(row=0, column=3)

	
	####### CODE REQUIRED (START) ####### (1 line)
	# Execute with mainloop()

	####### CODE REQUIRED (END) #######