import tensorflow.keras as keras
from PIL import Image
import numpy as np

def modelbird(arr):

    img_size=224

    model = keras.models.load_model('vgg16_model1.h5')

    image_directory = arr

    img = Image.open(image_directory)
    img = img.resize((img_size, img_size))
    images = []
    images.append(img)
    img_size = 224

    images = np.array([np.array(img)])
    images = images / 255.0
    predictions = model.predict(images)

    for i in range(len(images)):
        predicted_class = np.argmax(predictions[i])
        class_probability = predictions[i, predicted_class]
        print('Class probability:', class_probability)


import sys

arr = sys.argv[1]

val = modelbird(arr)