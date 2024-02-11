import scrapy
from MissingKidsData.items import KidsData

class MissingCollecter(scrapy.Spider):
    name = "MissingCollecter"

    def start_requests(self):
        url = "https://www.missingkids.org/missingkids/servlet/XmlServlet?act=rss&LanguageCountry=en_US&orgPrefix=NCMC&state=GA"
        
        yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        data = KidsData()
        for item in response.xpath('//channel/item'):
            data['Title'] = item.xpath('title//text()').extract_first()
            data['Description'] = item.xpath('description//text()').get()
            data['PosterLink'] = item.xpath('link//text()').get()
            data['ImgUrl'] = item.xpath('enclosure/@url').get()
            yield data
            

      