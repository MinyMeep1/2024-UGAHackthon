# pipelines.py

import mysql.connector
import re
import requests
import io


class MissingkidsdataPipeline:

    def __init__(self):
        self.conn = mysql.connector.connect(
            host = 'faces.mysql.database.azure.com',
            user = 'waterbottle85',
            password = 'Killer20045!',
            database = 'faces'
        )

       
        self.cur = self.conn.cursor()
        
        
        self.cur.execute("""
        CREATE TABLE IF NOT EXISTS faces(
            ID int NOT NULL auto_increment, 
            Name VARCHAR(100),
            Description VARCHAR(1000),
            PosterLink VARCHAR(1000),
            ImgUrl VARCHAR(1000),
            PRIMARY KEY (ID)
        )
        """)


    

    def process_item(self, item, spider):
        self.cur.execute(""" insert into faces (Name, Description, PosterLink, ImgUrl) values (%s,%s,%s,%s)""", (
            item["Title"],
            item["Description"],
            item["PosterLink"],
            item["ImgUrl"],
        ))

        self.conn.commit()

    def close_spider(self, spider):
        self.cur.close()
        self.conn.close()
    

