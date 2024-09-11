import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Function to saturate an image
def saturate_image(image, saturation_factor):
    hsv_image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    hsv_image[:, :, 1] = np.clip(hsv_image[:, :, 1] * saturation_factor, 0, 255)
    saturated_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2RGB)
    return saturated_image

# Function to desaturate an image
def desaturate_image(image, desaturation_factor):
    hsv_image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    hsv_image[:, :, 1] = np.clip(hsv_image[:, :, 1] * desaturation_factor, 0, 255)
    desaturated_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2RGB)
    return desaturated_image

# Function to convert wavelength to RGB
def wavelength_to_rgb(wavelength):
    gamma = 0.8
    intensity_max = 255
    factor = 0.0
    R, G, B = 0, 0, 0

    if (wavelength >= 380) and (wavelength < 440):
        R = -(wavelength - 440) / (440 - 380)
        G = 0.0
        B = 1.0
    elif (wavelength >= 440) and (wavelength < 490):
        R = 0.0
        G = (wavelength - 440) / (490 - 440)
        B = 1.0
    elif (wavelength >= 490) and (wavelength < 510):
        R = 0.0
        G = 1.0
        B = -(wavelength - 510) / (510 - 490)
    elif (wavelength >= 510) and (wavelength < 580):
        R = (wavelength - 510) / (580 - 510)
        G = 1.0
        B = 0.0
    elif (wavelength >= 580) and (wavelength < 645):
        R = 1.0
        G = -(wavelength - 645) / (645 - 580)
        B = 0.0

    R = int((R ** gamma) * intensity_max)
    G = int((G ** gamma) * intensity_max)
    B = int((B ** gamma) * intensity_max)

    return R, G, B

# Read the image
image_path = "flower.jpeg"
original_image = cv2.imread(image_path)
original_image_rgb = cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB)

# Load color matching functions from the provided CSV file
cmf_data = pd.read_csv("ciexyz31_1.csv", header=None, names=["Wavelength", "X", "Y", "Z"])

# Convert original image to XYZ color space
original_image_xyz = cv2.cvtColor(original_image_rgb, cv2.COLOR_RGB2XYZ)

# Extract wavelength information from the CSV file
wavelengths = cmf_data["Wavelength"].values

# Convert the wavelength to RGB and store chromaticity points for the original image
chromaticity_points_original = np.zeros((len(wavelengths), 3))
for i, wavelength in enumerate(wavelengths):
    chromaticity_points_original[i, :] = wavelength_to_rgb(wavelength)

# Plot chromaticity points for the original image
plt.figure(figsize=(8, 8))
plt.scatter(chromaticity_points_original[:, 1] / chromaticity_points_original.sum(axis=1),
            chromaticity_points_original[:, 2] / chromaticity_points_original.sum(axis=1),
            c=chromaticity_points_original[:, 0],
            cmap='viridis',
            marker='o',
            s=20)
plt.title("Original Image Chromaticity Points")
plt.xlabel("x")
plt.ylabel("y")
plt.colorbar(label="Wavelength (nm)")
plt.show()

# Assume plausible coordinates for gamut triangle vertices in CIE chromaticity chart
# You can experiment with different values here
vertex1 = (0.2, 0.3)
vertex2 = (0.8, 0.3)
vertex3 = (0.5, 0.8)

# Apply the transformation to the original image
transform_matrix = cv2.getAffineTransform(np.float32([vertex1, vertex2, vertex3]), np.float32([[0, 0], [1, 0], [0.5, 1]]))
transformed_image_xyz = cv2.warpAffine(original_image_xyz, transform_matrix, (original_image_xyz.shape[1], original_image_xyz.shape[0]))

# Convert the transformed image to RGB
transformed_image_rgb = cv2.cvtColor(transformed_image_xyz, cv2.COLOR_XYZ2RGB)

# Convert the wavelength to RGB for the transformed image and store chromaticity points
chromaticity_points_transformed = np.zeros((len(wavelengths), 3))
for i, wavelength in enumerate(wavelengths):
    chromaticity_points_transformed[i, :] = wavelength_to_rgb(wavelength)

# Plot chromaticity points for the transformed image
plt.figure(figsize=(8, 8))
plt.scatter(chromaticity_points_transformed[:, 1] / chromaticity_points_transformed.sum(axis=1),
            chromaticity_points_transformed[:, 2] / chromaticity_points_transformed.sum(axis=1),
            c=chromaticity_points_transformed[:, 0],
            cmap='viridis',
            marker='o',
            s=20)
plt.title("Transformed Image Chromaticity Points")
plt.xlabel("x")
plt.ylabel("y")
plt.colorbar(label="Wavelength (nm)")
plt.show()

# Save the maximally saturated image
max_saturated_image = saturate_image(transformed_image_rgb, 2.0)
cv2.imwrite("max_saturated_image.jpg", cv2.cvtColor(max_saturated_image, cv2.COLOR_RGB2BGR))

# Convert the maximally saturated image to XYZ color space for plotting
max_saturated_image_xyz = cv2.cvtColor(max_saturated_image, cv2.COLOR_RGB2XYZ)

# Convert the wavelength to RGB for the maximally saturated image and store chromaticity points
chromaticity_points_max_saturated = np.zeros((len(wavelengths), 3))
for i, wavelength in enumerate(wavelengths):
    chromaticity_points_max_saturated[i, :] = wavelength_to_rgb(wavelength)

# Plot chromaticity points for the maximally saturated image
plt.figure(figsize=(8, 8))
plt.scatter(chromaticity_points_max_saturated[:, 1] / chromaticity_points_max_saturated.sum(axis=1),
            chromaticity_points_max_saturated[:, 2] / chromaticity_points_max_saturated.sum(axis=1),
            c=chromaticity_points_max_saturated[:, 0],
            cmap='viridis',
            marker='o',
            s=20)
plt.title("Maximally Saturated Image Chromaticity Points")
plt.xlabel("x")
plt.ylabel("y")
plt.colorbar(label="Wavelength (nm)")
plt.show()

# Save the desaturated image
desaturated_image = desaturate_image(transformed_image_rgb, 0.5)
cv2.imwrite("desaturated_image.jpg", cv2.cvtColor(desaturated_image, cv2.COLOR_RGB2BGR))

# Convert the desaturated image to XYZ color space for plotting
desaturated_image_xyz = cv2.cvtColor(desaturated_image, cv2.COLOR_RGB2XYZ)

# Convert the wavelength to RGB for the desaturated image and store chromaticity points
chromaticity_points_desaturated = np.zeros((len(wavelengths), 3))
for i, wavelength in enumerate(wavelengths):
    chromaticity_points_desaturated[i, :] = wavelength_to_rgb(wavelength)

# Plot chromaticity points for the desaturated image
plt.figure(figsize=(8, 8))
plt.scatter(chromaticity_points_desaturated[:, 1] / chromaticity_points_desaturated.sum(axis=1),
            chromaticity_points_desaturated[:, 2] / chromaticity_points_desaturated.sum(axis=1),
            c=chromaticity_points_desaturated[:, 0],
            cmap='viridis',
            marker='o',
            s=20)
plt.title("Desaturated Image Chromaticity Points")
plt.xlabel("x")
plt.ylabel("y")
plt.colorbar(label="Wavelength (nm)")
plt.show()

# Save the saturated-desaturated image
saturated_desaturated_image = saturate_image(desaturated_image, 2.0)
cv2.imwrite("saturated_desaturated_image.jpg", cv2.cvtColor(saturated_desaturated_image, cv2.COLOR_RGB2BGR))

# Convert the saturated-desaturated image to XYZ color space for plotting
saturated_desaturated_image_xyz = cv2.cvtColor(saturated_desaturated_image, cv2.COLOR_RGB2XYZ)

# Convert the wavelength to RGB for the saturated-desaturated image and store chromaticity points
chromaticity_points_saturated_desaturated = np.zeros((len(wavelengths), 3))
for i, wavelength in enumerate(wavelengths):
    chromaticity_points_saturated_desaturated[i, :] = wavelength_to_rgb(wavelength)

# Plot chromaticity points for the saturated-desaturated image
plt.figure(figsize=(8, 8))
plt.scatter(chromaticity_points_saturated_desaturated[:, 1] / chromaticity_points_saturated_desaturated.sum(axis=1),
            chromaticity_points_saturated_desaturated[:, 2] / chromaticity_points_saturated_desaturated.sum(axis=1),
            c=chromaticity_points_saturated_desaturated[:, 0],
            cmap='viridis',
            marker='o',
            s=20)
plt.title("Saturated-Desaturated Image Chromaticity Points")
plt.xlabel("x")
plt.ylabel("y")
plt.colorbar(label="Wavelength (nm)")
plt.show()
