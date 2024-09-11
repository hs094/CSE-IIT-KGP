from ctypes import resize
import tkinter as tk
from tkinter import filedialog, messagebox, font, Toplevel, Label, Entry, Button, StringVar
from tokenize import Double
import cv2
import numpy as np
from PIL import Image, ImageTk
import os


class ImageApp:
    def __init__(self, root):
        self.root = root
        self.open_jpg = False
        self.drawing_mode = tk.StringVar()
        self.drawing_mode.set("point")  # Default drawing mode is point
        self.last_x_coord = -1
        self.last_y_coord = -1
        self.x_ori = 140.0
        self.y_ori = 130.0
        self.ovals = []
        self.lines = []
        self.li = 0
        self.lin_len = 0
        # empty arrays for your Entrys and StringVars
       
        self.root.title("ADIPCV Assignment 3 Group K: 20CS30023, 19CS30023")
        self.root.geometry("800x800")

        self.header = tk.Label(self.root, text="Image Viewer", font=("Helvetica", 16))
        self.header.pack(pady=20)

        self.canvas = tk.Canvas(self.root, width=800, height=600, bg="white")
        self.canvas.pack()
       
        self.button_bar = tk.Frame(self.root)
        self.button_bar.pack(side=tk.BOTTOM, fill=tk.X)
       
        self.open_button = tk.Button(self.button_bar, text="Open Image", command=self.open_image)
        self.open_button.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.refresh_button = tk.Button(self.button_bar, text="Refresh", command=self.refresh)
        self.refresh_button.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.refresh_button = tk.Button(self.button_bar, text="Exit App", command=self.exit)
        self.refresh_button.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.pixel_coor = tk.Button(self.button_bar, text="1.Calculate Pixel Coordinate", command=self.calculate_pixel_coordinate)
        self.pixel_coor.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.line_len = tk.Button(self.button_bar, text="2.Calculate Line Length", command=self.calculate_line_length)
        self.line_len.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.dual_conic = tk.Button(self.button_bar, text="3.Compute Dual Conic", command=self.calculate_dual_conic)
        self.dual_conic.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.homo_mat = tk.Button(self.button_bar, text="4.Homography Matrice", command=self.calculate_homo_matrices)
        self.homo_mat.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.aff_rec = tk.Button(self.button_bar, text="5.Affine Rectification", command=self.perform_affine_rectification)
        self.aff_rec.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.met_rec = tk.Button(self.button_bar, text="6.Metric Rectification", command=self.perform_metric_rectification)
        self.met_rec.pack(side=tk.LEFT, padx=6.2, pady=9)
       
        self.radio_line = tk.Radiobutton(self.root, text="Line", variable=self.drawing_mode, value="line")
        self.radio_line.pack(side=tk.TOP, padx=10, pady=9)
       
        self.radio_point = tk.Radiobutton(self.root, text="Point", variable=self.drawing_mode, value="point")
        self.radio_point.pack(side=tk.TOP, padx=10, pady=9)
       
        self.canvas.bind("<Button-1>", self.on_canvas_click)  # Bind left mouse click to canvas
        self.root.bind("<Configure>", self.on_resize)

    def on_resize(self, event):
        # Configure the padding of each button based on the window width
        window_width = event.width
        button_count = len(self.button_bar.winfo_children())
        padding = int(window_width / button_count * 0.20)  # 20% padding

        for button in self.button_bar.winfo_children():
            button.pack_configure(padx=padding, pady=9)

    def run(self):
        self.photo = None
        self.path = None
        self.root.mainloop()

    def check(self,x,y):
        x -= self.x_ori
        y -= self.y_ori
        return (x >= 0 and y >= 0 and x < self.photo.width() and y < self.photo.height())
   
    def push_oval(self, x,y):
        oval = self.canvas.create_oval(x-2, y-2, x+2, y+2, outline="red",fill="red", width=2)  # Draw red spot
        if x >= 0 or y >= 0:
            self.ovals.append(oval)
   
    def calculate_length(self, p1, p2):
        # Calculate the length between two points using the Euclidean distance formula
        return np.linalg.norm(np.array(p2) - np.array(p1))
 
    def refresh(self):
        for oval in self.ovals:
            self.canvas.delete(oval)
        for line in self.lines:
            self.canvas.delete(line)
        self.ovals = []
        self.lines = []
        self.last_x_coord = -1
        self.last_y_coord = -1
        self.li = 0
        self.line_len = 0
       
    def exit(self):
        if messagebox.askokcancel("Quit", "Do you really want to quit?"):
            self.root.destroy()
       
    def open_image(self):
        if self.open_jpg:
            messagebox.showinfo("Error!", "An Image is Open in Canvas!")
            return

        file_path = filedialog.askopenfilename(title="Select an image file",
                                        filetypes=[("Image files", "*.jpeg *.jpg *.png")])

        if file_path:
            self.path = file_path
            image = cv2.imread(file_path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert color from BGR to RGB
            image = Image.fromarray(image)  # Convert image to PIL Image
            self.photo = ImageTk.PhotoImage(image)  # Convert PIL Image to Tkinter PhotoImage
            self.canvas.create_image(self.x_ori, self.y_ori, anchor=tk.NW, image=self.photo)  # Display image on canvas
    
    def calculate_pixel_coordinate(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        if len(self.ovals) < 1:
            messagebox.showinfo("Error!", "No Points Present in Canvas!")
        else:
            messagebox.showinfo("Pixel Coordinates", f"Last Drawn Point are drawn at pixel coordinates: ({self.last_x_coord-self.x_ori}, {self.last_y_coord-self.y_ori})")

    def calculate_line_length(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        if len(self.lines) < 1:
            messagebox.showinfo("Error!", "No Lines Present in Canvas!")
        else:
            messagebox.showinfo("Length", f"Length of the Last Drawn Line: {self.line_len:.2f} pixels")
   
    def calculate_dual_conic(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        points_h = np.array([[[100, 71, 1], [381, 72, 1]], 
                            [[114, 222, 1], [369, 222, 1]]])
        points_v = np.array([[[61, 43, 1], [89, 248, 1]], 
                            [[420, 44, 1], [393, 250, 1]], 
                            [[75, 53, 1], [98, 242, 1]]])

        # Compute the lines by crossing corresponding points
        lines_h = np.cross(points_h[:,0], points_h[:,1])
        lines_v = np.cross(points_v[:,0], points_v[:,1])

        # Combine all lines into a single array
        lines = np.vstack([lines_h, lines_v])

        print("Six different pairs of lines, which are supposed to be perpendicular in the original painting having endpoints:")
        # Loop to print all combinations of horizontal and vertical lines
        for i in range(len(points_h)):
            for j in range(len(points_v)):
                print(f"Pair of Line (End-points): {i*len(points_v) + j + 1}:- ({points_h[i]}, {points_v[j]})")

        # Compute the dual conic at infinity
        dual_conic = np.zeros((3, 3))
        for line in lines:
            dual_conic += np.outer(line, line)

        # Display the dual conic at infinity
        print("Dual Conic at Infinity:")
        print(dual_conic)
        messagebox.showinfo("Dual Conic at Infinity", f"{dual_conic}")

       
    def calculate_homo_matrices(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        # Define the corners of the target rectangles
        image = cv2.imread(self.path)
        target_corners_2_3 = np.array([[0, 0], [0, 300], [200, 300], [200, 0]], dtype=np.float32)
        target_corners_3_4 = np.array([[0, 0], [0, 400], [300, 400], [300, 0]], dtype=np.float32)

        # # Define the corners of the painting (you need to identify these points from the image)
        painting_corners = np.array([[8.0, 1.0], [52.0, 286.0], [435.0, 287.0], [476.0, 1.0]], dtype=np.float32)

        # # Calculate the homography matrices
        homography_2_3, _ = cv2.findHomography(painting_corners, target_corners_2_3)
        homography_3_4, _ = cv2.findHomography(painting_corners, target_corners_3_4)
        message = (
            "Homography Matrix for 2:3 Aspect Ratio:\n"
            f"\t{homography_2_3[0][0]:.2f}  {homography_2_3[0][1]:.2f}  {homography_2_3[0][2]:.2f}\n"
            f"\t{homography_2_3[1][0]:.2f}  {homography_2_3[1][1]:.2f}  {homography_2_3[1][2]:.2f}\n"
            f"\t{homography_2_3[2][0]:.2f}  {homography_2_3[2][1]:.2f}  {homography_2_3[2][2]:.2f}"
        )
        messagebox.showinfo("Homography Matrix for 2:3 Ratio", message)
        message = (
            "Homography Matrix for 3:4 aspect ratio:\n"
            f"\t{homography_3_4[0][0]:.2f}  {homography_3_4[0][1]:.2f}  {homography_3_4[0][2]:.2f}\n"
            f"\t{homography_3_4[1][0]:.2f}  {homography_3_4[1][1]:.2f}  {homography_3_4[1][2]:.2f}\n"
            f"\t{homography_3_4[2][0]:.2f}  {homography_3_4[2][1]:.2f}  {homography_3_4[2][2]:.2f}"
        )
        messagebox.showinfo("Homography Matrix for 3:4 Ratio", message)
        # Save the transformed images
        output_folder = "Output"
        os.makedirs(output_folder, exist_ok=True)
       
        # Create a Toplevel window to display the transformed images
        top_2_3 = tk.Toplevel(self.root)
        top_2_3.title("Transformed Image 2:3")
        transformed_image_23 = cv2.warpPerspective(image, homography_2_3, (image.shape[1], image.shape[0]))
        cv2.imwrite(os.path.join(output_folder, "transformed_image_2_3.jpg"), transformed_image_23)
        transformed_image_23 = cv2.cvtColor(transformed_image_23, cv2.COLOR_BGR2RGB)
        img_2_3 = Image.fromarray(transformed_image_23)
        img_tk_2_3 = ImageTk.PhotoImage(img_2_3)
        label_2_3 = tk.Label(top_2_3, image=img_tk_2_3)
        label_2_3.pack()

        top_3_4 = tk.Toplevel(self.root)
        top_3_4.title("Transformed Image 3:4")
        transformed_image_34 = cv2.warpPerspective(image, homography_3_4, (image.shape[1], image.shape[0]))
        cv2.imwrite(os.path.join(output_folder, "transformed_image_3_4.jpg"), transformed_image_34)
        transformed_image_34 = cv2.cvtColor(transformed_image_34, cv2.COLOR_BGR2RGB)
        img_3_4 = Image.fromarray(transformed_image_34)
        img_tk_3_4 = ImageTk.PhotoImage(img_3_4)
        label_3_4 = tk.Label(top_3_4, image=img_tk_3_4)
        label_3_4.pack()

        # Keep a reference to the image objects to prevent them from being garbage collected
        label_2_3.image = img_tk_2_3
        label_3_4.image = img_tk_3_4

    def perform_affine_rectification(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        image = cv2.imread(self.path)
        pt1 = np.array([100, 71, 1])
        pt2 = np.array([383, 72, 1])
        pt3 = np.array([98, 241, 1])
        pt4 = np.array([387, 241, 1])
        pt5 = np.array([60, 43, 1])
        pt6 = np.array([89, 252, 1])
        pt7 = np.array([420, 44, 1])
        pt8 = np.array([395, 249, 1])
        l1 = np.cross(pt1, pt2)
        l2 = np.cross(pt3, pt4)
        l3 = np.cross(pt5, pt6)
        l4 = np.cross(pt7, pt8)
        v = np.cross(np.cross(l1,l2), np.cross(l3,l4))
        v = v/v[2]
        H = np.array([[1, 0, 0], [0, 1, 0], [v[0], v[1], v[2]]])
        output_folder = "Output"
        os.makedirs(output_folder, exist_ok=True)
        # Apply the affine transformation
        affine_rec = tk.Toplevel(self.root)
        affine_rec.title("Affine Rectification via Transformation Matrix")
        rectified_image = cv2.warpPerspective(image, H, (image.shape[1], image.shape[0]))
        cv2.imwrite(os.path.join(output_folder, "transformed_image_affine_t.jpg"), rectified_image)
        rectified_image = cv2.cvtColor(rectified_image, cv2.COLOR_BGR2RGB)
        aff_rec = Image.fromarray(rectified_image)
        aff_rec_tk = ImageTk.PhotoImage(aff_rec)
        label_aff = tk.Label(affine_rec, image=aff_rec_tk)
        label_aff.pack()
       
        label_aff.image = aff_rec_tk
   
    def perform_metric_rectification(self):
        if self.path is None:
            messagebox.showinfo("Error", "Please open an image first.")
            return
        image = cv2.imread(self.path)
        # Define the coordinates of a rectangle in the target space
        rect = np.array([[0, 0], [0, 200], [300, 200], [300, 0]], dtype=np.float32)
        # Define the coordinates of the corresponding points in the input image
        points = np.array([[8, 1], [52, 286], [435, 287], [476, 1]], dtype=np.float32)
        # Calculate the homography matrix
        homography_matrix, _ = cv2.findHomography(points, rect)
        # Compute the true aspect ratio from the transformed image
        true_aspect_ratio = np.linalg.norm(homography_matrix[:, 0]) / np.linalg.norm(homography_matrix[:, 1])
        messagebox.showinfo("True Aspect Ratio", f"True Aspect Ratio: {true_aspect_ratio}")
        # Save the transformed images
        output_folder = "Output"
        os.makedirs(output_folder, exist_ok=True)
        # Rectify the image
        met_rec = tk.Toplevel(self.root)
        met_rec.title("Metric Rectification")
        rectified_image = cv2.warpPerspective(image, homography_matrix, (300, 200))
        cv2.imwrite(os.path.join(output_folder, "metric_rec.jpg"), rectified_image)
        rectified_image = cv2.cvtColor(rectified_image, cv2.COLOR_BGR2RGB)
        img_rectified = Image.fromarray(rectified_image)
        img_tk_rectified = ImageTk.PhotoImage(img_rectified)
        label = tk.Label(met_rec, image=img_tk_rectified)
        label.pack()
        # Keep a reference to the image objects to prevent them from being garbage collected
        label.image = img_tk_rectified
   
    def on_canvas_click(self, event):
        x = self.canvas.canvasx(event.x)
        y = self.canvas.canvasy(event.y)
        if self.drawing_mode.get() == "line":
            if self.check(x,y):
                print(f"Clicked at pixel coordinates: ({x-self.x_ori}, {y-self.y_ori})")
                if self.li == 0:
                        self.last_x_coord = x
                        self.last_y_coord = y
                        self.push_oval(x,y)
                        self.li = 1
                else:
                    self.push_oval(x,y)
                    line = self.canvas.create_line(self.last_x_coord, self.last_y_coord, x, y, fill="red")
                    self.lines.append(line)
                    length = self.calculate_length((self.last_x_coord, self.last_y_coord), (x, y))
                    messagebox.showinfo("Length", f"Endpoints:- \nP1: ({self.last_x_coord-self.x_ori}, {self.last_y_coord-self.y_ori}) \nP2: ({x-self.x_ori}, {y-self.y_ori}) \n\nLength of the line:- {length:.2f} pixels")
                    self.last_x_coord = x
                    self.last_y_coord = y
                    self.li = 0
                    self.line_len = length
            else:
                messagebox.showinfo("Error!", "Select coordinate is outside Canvas / Invalid Operation!")

        elif self.drawing_mode.get() == "point":
            if self.check(x,y):
                print(f"Clicked at pixel coordinates: ({x-self.x_ori}, {y-self.y_ori})")
                self.push_oval(x,y)
                self.last_x_coord = x
                self.last_y_coord = y
                messagebox.showinfo("Pixel Coordinates", f"Drawn Point have pixel coordinates: ({x-self.x_ori}, {y-self.y_ori})")
            else:
                messagebox.showinfo("Error!", "Select coordinate is outside Canvas / Invald Operation!")      
        else:
            messagebox.showinfo("Error!", "Select a drawing mode!")
            pass
       
if __name__ == "__main__":
    root = tk.Tk()
    root.option_add("*Dialog.msg.font", ("Arial", 12))
    root.configure(bg='bisque2')
    app = ImageApp(root)
    app.run()