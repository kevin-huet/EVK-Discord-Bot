import uuid

from ascii_converter import *
import requests
import shutil
import os

def color_select(message):
    if "black" in message.content:
        return "black"
    if "white" in message.content:
        return "white"
    if "red" in message.content:
        return "red"
    if "blue" in message.content:
        return "blue"
    if "green" in message.content:
        return "green"
    return "white"

def save_image(url):
    file_name = str(uuid.uuid1())
    response = requests.get(url, stream=True)
    with open(file_name+'.png', 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response
    return file_name


def ascii_image_conversion(color, file_name):
    img = PIL.Image.open(file_name+'.png')
    img = img_resize(img)
    img = grayscale(img)
    ascii_image = pixels_to_ascii(img)
    os.remove(file_name+'.png')
    return create_image_from_ascii(ascii_image, color)


def run(message):
    color = color_select(message)
    print(color)
    image_url = message.attachments[0].url
    emoji = '\N{THUMBS UP SIGN}'
    file_name = save_image(image_url)
    return ascii_image_conversion(color, file_name)