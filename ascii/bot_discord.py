import discord
import random
import requests
import shutil
import PIL
import yaml
import imgur
import io
import aiohttp
import random
import os
from commands import search, raiderio, ascii
from ascii_converter import img_resize, grayscale, pixels_to_ascii, create_image_from_ascii

TOKEN = ''

client = discord.Client()


def init():
    global TOKEN
    a_yaml_file = open("config.yaml")
    parsed_yaml_file = yaml.load(a_yaml_file, Loader=yaml.FullLoader)
    TOKEN = parsed_yaml_file['token']


@client.event
async def on_message(message):
    channel = message.channel
    # we do not want the bot to reply to itself
    if message.author == client.user:
        return

    if message.content.startswith('!lastascii'):
        await channel.send(file=discord.File('test.png'))

    if message.content.startswith('!ascii'):
        result = ascii.run(message)
        await message.add_reaction('\N{THUMBS UP SIGN}')
        await channel.send('{0.author.mention}'.format(message), file=discord.File(result+'.png'))
        os.remove(result+".png")

    if message.content.startswith('!help'):
        await message.author.send('Usage:\n!ascii + image')

    if message.content.startswith('!stonks'):
        await channel.send('{0.author.mention}'.format(message), file=discord.File('stonk.jpg'))

    if message.content.startswith('!notstonks'):
        await channel.send('{0.author.mention}'.format(message), file=discord.File('notstonks.png'))

    if message.content.startswith('?affix'):
        affixes = raiderio.affixes()
        msg = '{0.author.mention} '+affixes[0]['name']+' '+affixes[1]['name']+' '+affixes[2]['name']
        await channel.send(msg.format(message))

    if message.content.startswith('?search'):
        await channel.send(search.run(message, channel))


@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')


init()
print(TOKEN)
client.run(TOKEN)
