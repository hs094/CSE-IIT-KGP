import tkinter as tk
from tkinter import messagebox
from tokenize import Double
import cv2
import matplotlib.pyplot as plt
import numpy as np
import os

class ImageApp:
    def __init__(self, root):
        self.root = root
        self.img1_path = 'Baltimore_A1.jpg'
        self.img2_path = 'Baltimore_A2.jpg'
        self.top_p = 10
        self.dir = 'Output/'

        self.root.title("ADIPCV Assignment 4 Additional: 20CS30023")
        self.root.geometry("800x800")

        self.header = tk.Label(self.root, text="Stereo Projective Geometry", font=("Arial", 50))
        self.header.pack(pady=20)
       
        self.button_bar = tk.Frame(self.root)
        self.button_bar.pack(side=tk.TOP, fill=tk.Y, padx=10, pady=150, anchor=tk.N)

        self.pixel_coor = tk.Button(self.button_bar, text="(a) Recording a pair of corresponding points", command=self.task1, font=("Helvetica", 14), width=50, height=2)
        self.pixel_coor.pack(side=tk.TOP, padx=6.2, pady=9)

        self.line_len = tk.Button(self.button_bar, text="(b) Matrix Estimation", command=self.task2, font=("Helvetica", 14), width=50, height=2)
        self.line_len.pack(side=tk.TOP, padx=6.2, pady=9)

        self.exit_button = tk.Button(self.button_bar, text="Exit App", command=self.exit, font=("Helvetica", 14), width=50, height=2)
        self.exit_button.pack(side=tk.TOP, padx=6.2, pady=9)

        self.image1 = cv2.imread(self.img1_path, cv2.IMREAD_COLOR)
        self.image2 = cv2.imread(self.img2_path, cv2.IMREAD_COLOR)
        orb = cv2.ORB_create()
        kp1 = orb.detect(self.image1, None)
        kp2 = orb.detect(self.image2, None)
        self.kp1, self.des1 = orb.compute(self.image1, kp1)
        self.kp2, self.des2 = orb.compute(self.image2, kp2)
        self.cal_match(self.kp1, self.kp2, self.des1, self.des2)

    def run(self):
        self.H = None
        os.makedirs(self.dir, exist_ok=True)
        self.root.mainloop()
        
    def exit(self):
        if messagebox.askokcancel("Quit", "Do you really want to quit?"):
            self.root.destroy()
            plt.close('all')

    def cal_match(self, kp1, kp2, des1, des2):
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        # Match descriptors.
        self.matches = bf.match(des1, des2)
        # Sort them in the order of their distance.
        self.matches = sorted(self.matches, key=lambda x: x.distance)
        print(f'Identified {len(self.matches)} pairs of correspondences in the images')
        assert(len(self.matches) >= self.top_p) 
        # Get pixel coordinate pairs of the match coordinates
        self.match_coordinates = []
        for match in self.matches[:self.top_p]:  # considering only the first 10 matches
            img1_idx = match.queryIdx
            img2_idx = match.trainIdx
            (x1, y1) = kp1[img1_idx].pt
            (x2, y2) = kp2[img2_idx].pt
            self.match_coordinates.append(((int(x1), int(y1)), (int(x2), int(y2))))
        
    def task1(self):
        img1 = cv2.cvtColor(cv2.drawKeypoints(self.image1, self.kp1, None, color=(0, 255, 0), flags=0), cv2.COLOR_BGR2RGB)
        img2 = cv2.cvtColor(cv2.drawKeypoints(self.image2, self.kp2, None, color=(0, 255, 0), flags=0), cv2.COLOR_BGR2RGB)
        print(f'The top 10 Matched Coordinate are: {self.match_coordinates}')
        # Draw first 10 matches.
        img3 = cv2.cvtColor(cv2.drawMatches(self.image1, self.kp1, self.image2, self.kp2, self.matches[:self.top_p], None, flags=2), cv2.COLOR_BGR2RGB)
        # Combine the images for display
        self.figure = plt.figure(figsize=(15, 10))
        # Plot img1 with a label
        plt.subplot(3, 2, 1)
        plt.imshow(img1)
        plt.axis('on')
        plt.title('Baltimore_A1.jpg')
        cv2.imwrite(f'{self.dir}img1.png', img=img1)
        # Plot img2 with a label
        plt.subplot(3, 2, 2)
        plt.imshow(img2)
        plt.axis('on')
        plt.title('Baltimore_A2.jpg')
        cv2.imwrite(f'{self.dir}img2.png', img=img2)
        # Plot img3 with a label and axis
        plt.subplot(4, 1, 3)
        plt.imshow(img3)
        plt.autoscale(True)
        plt.axis('on')
        plt.title('Matches')
        cv2.imwrite(f'{self.dir}img3.png', img=img3)
        # Set the overall title
        plt.suptitle('Corresponding points between images', fontsize=16)
        plt.savefig(f'{self.dir}corresponding_points.png')
        plt.show()

    def task2(self):
        # Remove existing buttons
        self.pixel_coor.pack_forget()
        self.line_len.pack_forget()
        self.exit_button.pack_forget()

        # Create new buttons for Options 1, 2, 3, and Back
        options1_button = tk.Button(self.button_bar, text="(i) Homography Matrix (H)", command=self.compute_H_matrix, font=("Helvetica", 14), width=50, height=2)
        options1_button.pack(side=tk.TOP, padx=6.2, pady=9)

        options2_button = tk.Button(self.button_bar, text="(ii) Rotation matrix (R) for the Second Camera", command=self.compute_R_matrix, font=("Helvetica", 14), width=50, height=2)
        options2_button.pack(side=tk.TOP, padx=6.2, pady=9)

        options3_button = tk.Button(self.button_bar, text="(iii) Fundamental Matrix (F)", command=self.compute_F_matrix, font=("Helvetica", 14), width=50, height=2)
        options3_button.pack(side=tk.TOP, padx=6.2, pady=9)

        back_button = tk.Button(self.button_bar, text="Back", command=self.back_to_main, font=("Helvetica", 14), width=50, height=2)
        back_button.pack(side=tk.TOP, padx=6.2, pady=9)

    def compute_H_matrix(self):
        # List of corresponding points
        correspondences = [((x, y), (X, Y)) for ((x, y), (X, Y)) in self.match_coordinates]

        # Extract source and destination points
        src_points = np.array([[x, y] for ((x, y), _) in correspondences], dtype=np.float32)
        dst_points = np.array([[X, Y] for (_, (X, Y)) in correspondences], dtype=np.float32)

        # Compute Homography matrix
        H, _ = cv2.findHomography(src_points, dst_points)
        self.H = H
        print("Homography matrix H:")
        print(H)
        message = (
            "Homography Matrix:\n\n"
            f"{H[0][0]:.5f}  {H[0][1]:.5f}  {H[0][2]:.5f}\n"
            f"{H[1][0]:.5f}  {H[1][1]:.5f}  {H[1][2]:.5f}\n"
            f"{H[2][0]:.5f}  {H[2][1]:.5f}  {H[2][2]:.5f}"
        )
        file_path = os.path.join(self.dir, 'log.txt')
        with open(file_path, "w") as file:
            file.write(f"{message}\n\n")
        messagebox.showinfo("Homography matrix (H)", message=message)        

    def compute_R_matrix(self):
        if self.H is None:
            messagebox.showinfo("Error!", "Homography matrix is needed for Calculation. Please compute Homography matrix first.")
            return
        h = self.image1.shape[0]
        w = self.image1.shape[1]
        # Calibration matrix K for the first camera (3x3)
        K = np.array([[-h/2.0, 0, h/2.0],
                    [0, w/2.0, w/2.0],
                    [0, 0, 1]])
        # Estimate rotation matrix R
        R = np.dot(np.linalg.inv(K), self.H)

        print("Rotation matrix R:")
        print(R)
        message = (
            "Rotation Matrix:\n\n"
            f"{R[0][0]:.5f}  {R[0][1]:.5f}  {R[0][2]:.5f}\n"
            f"{R[1][0]:.5f}  {R[1][1]:.5f}  {R[1][2]:.5f}\n"
            f"{R[2][0]:.5f}  {R[2][1]:.5f}  {R[2][2]:.5f}"
        )
        file_path = os.path.join(self.dir, 'log.txt')
        with open(file_path, "a") as file:
            file.write(f"{message}\n\n")
        messagebox.showinfo("Rotation matrix (R)", message=message)

    def compute_F_matrix(self):
        # 8-point correspondences (normalized image coordinates)
        # List of corresponding points
        assert(len(self.match_coordinates) >= 8)
        correspondences = [((x, y), (X, Y)) for ((x, y), (X, Y)) in self.match_coordinates[:8]]
        h = self.image1.shape[0]
        w = self.image1.shape[1]
        # Extract normalized source and destination points
        src_points = np.array([[x/h, y/w] for ((x, y), _) in correspondences], dtype=np.float32)
        dst_points = np.array([[X/h, Y/w] for (_, (X, Y)) in correspondences], dtype=np.float32)

        # Construct matrix A
        A = np.zeros((8, 9))
        for i in range(8):
            A[i] = [src_points[i][0] * dst_points[i][0], src_points[i][0] * dst_points[i][1], src_points[i][0],
                    src_points[i][1] * dst_points[i][0], src_points[i][1] * dst_points[i][1], src_points[i][1],
                    dst_points[i][0], dst_points[i][1], 1]

        # Solve for the fundamental matrix using SVD
        _, _, V = np.linalg.svd(A)
        F = V[-1].reshape(3, 3)

        # Enforce rank-2 constraint on F
        U, S, V = np.linalg.svd(F)
        S[-1] = 0
        F = np.dot(U, np.dot(np.diag(S), V))

        print("Fundamental matrix F:")
        print(F)
        message = (
            "Fundamental Matrix:\n\n"
            f"{F[0][0]:.5f}  {F[0][1]:.5f}  {F[0][2]:.5f}\n"
            f"{F[1][0]:.5f}  {F[1][1]:.5f}  {F[1][2]:.5f}\n"
            f"{F[2][0]:.5f}  {F[2][1]:.5f}  {F[2][2]:.5f}"
        )
        file_path = os.path.join(self.dir, 'log.txt')
        with open(file_path, "a") as file:
            file.write(f"{message}\n\n")
        messagebox.showinfo("Fundamental Matrix (F)", message=message)

    def back_to_main(self):
        # Remove new buttons
        for widget in self.button_bar.winfo_children():
            widget.pack_forget()

        # Re-create the original buttons
        self.pixel_coor.pack(side=tk.TOP, padx=6.2, pady=9)
        self.line_len.pack(side=tk.TOP, padx=6.2, pady=9)
        self.exit_button.pack(side=tk.TOP, padx=6.2, pady=9)


if __name__ == "__main__":
    root = tk.Tk()
    app = ImageApp(root)
    app.run()