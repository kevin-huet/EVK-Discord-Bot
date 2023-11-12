import json

import requests
import yaml
import random

clientId = ''

def init():
    global clientId
    a_yaml_file = open("config.yaml")
    parsed_yaml_file = yaml.load(a_yaml_file, Loader=yaml.FullLoader)
    clientId = parsed_yaml_file['imgur_client_id']


def search_image(tags):
    apikey = clientId  # test value
    lmt = 8

    # our test search
    search_term = tags

    # get the top 8 GIFs for the search term
    r = requests.get(
        "https://api.tenor.com/v1/search?q=%s&key=%s&limit=%s" % (search_term, apikey, lmt))

    if r.status_code == 200:
        # load the GIFs using the urls for the smaller GIF sizes
        rng = json.loads(r.content)
        return random.choice(rng['results'])

    else:
        return 'result not found'
