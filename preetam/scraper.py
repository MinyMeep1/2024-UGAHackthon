import requests

URL = "https://www.missingkids.org/gethelpnow/search/poster-results"
page = requests.get(URL)

print(page.text)