import uuid

import PIL.Image
from PIL import ImageFont, ImageDraw, Image
import sys

chars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]
_BLACK = (0, 0, 0)
_WHITE = (255, 255, 255)
_RED = (220,20,60)
_GREEN = (124,252,0)
_BLUE = (30,144,255)
MAX_WIDTH = 1920
MAX_HEIGHT = 1920


def resize_img(file_name):
    i = 0
    img = Image.open(file_name+'.png')
    width = img.size[0]
    height = img.size[1]
    while i != 2:
        if height > MAX_HEIGHT:
            new_height = MAX_HEIGHT
            new_width = new_height * width / height
            img = img.resize((int(new_width), int(new_height)), Image.ANTIALIAS)
        if width > MAX_WIDTH:
            new_height = MAX_WIDTH
            new_width = new_height * width / height
            img = img.resize((int(new_width), int(new_height)), Image.ANTIALIAS)
        i += 1
    img.save(file_name+'.png')


def create_image_from_ascii(txt, _color):
    # get the size of the text
    nb_line = txt.count('\n')
    nb_char = 0
    file_name = str(uuid.uuid1())
    while txt[nb_char]:
        if txt[nb_char] == '\n':
            break
        nb_char += 1
    if _color == "black":
        image = Image.new('RGB', (6 * nb_char, int((15 * nb_line))), color="white")
    else:
        image = Image.new('RGB', (6 * nb_char, int((15 * nb_line))), color="black")
    draw = ImageDraw.Draw(image)
    print((15 * nb_line) * (6 * nb_char))
    if _color == "white":
        draw.text((0, 0), txt, _WHITE)
    elif _color == "red":
        draw.text((0, 0), txt, _RED)
    elif _color == "blue":
        draw.text((0, 0), txt, _BLUE)
    elif _color == "green":
        draw.text((0, 0), txt, _GREEN)
    else:
        draw.text((0, 0), txt, _BLACK)
    image.save(file_name+'.png')
    resize_img(file_name)
    return file_name


def img_resize(img):
    width, height = img.size
    aspect_ratio = height / width
    new_width = 300
    new_height = aspect_ratio * new_width * 0.42
    img = img.resize((new_width, int(new_height)))
    return img


def pixels_to_ascii(img):
    new_width, new_height = img.size
    pixels = img.getdata()
    new_pixels = [chars[pixel // 25] for pixel in pixels]
    new_pixels = ''.join(new_pixels)
    new_pixels_count = len(new_pixels)
    ascii_image = [new_pixels[index:index + new_width] for index in range(0, new_pixels_count, new_width)]
    ascii_image = "\n".join(ascii_image)
    return ascii_image


def grayscale(img):
    return img.convert("L")


