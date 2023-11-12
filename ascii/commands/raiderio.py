import requests

def affixes():
    headers = {
        'accept': 'application/json',
    }

    params = (
        ('region', 'eu'),
        ('locale', 'en'),
    )
    response = requests.get('https://raider.io/api/v1/mythic-plus/affixes', headers=headers, params=params)
    response = response.json()
    return response['affix_details']