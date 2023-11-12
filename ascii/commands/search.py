import imgur

def run(message, channel):
    array = message.content
    array = array.split(' ')
    if len(array) > 1:
        array[0] = ""
        value = " ".join(array)
        print(value)
        image = imgur.search_image(value)
        if isinstance(image, str):
            return 'no result found'
        else:
           return image['url']