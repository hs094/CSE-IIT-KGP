import cv2
import numpy as np

# Step 1: Read the image
image_path = 'contrast.jpg'
original_image = cv2.imread(image_path)

# Step 2: Convert the image to HSV
hsv_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2HSV)

# Step 3: Apply contrast enhancement while preserving color
v_channel = hsv_image[:,:,2]
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
enhanced_v_channel = clahe.apply(v_channel)
hsv_image[:,:,2] = enhanced_v_channel

# Step 4: Convert the image back to BGR
enhanced_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)

# Save the enhanced image
enhanced_image_path = 'enhanced_contrast.jpg'
cv2.imwrite(enhanced_image_path, enhanced_image)

print("Enhanced image saved as:", enhanced_image_path)
