# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field

class KidsData(Item):
    # define the fields for your item here like:
    Title = Field()
    Description = Field()
    PosterLink = Field()
    ImgUrl = Field()

    pass
