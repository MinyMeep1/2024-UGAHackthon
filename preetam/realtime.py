from deepface import DeepFace

import numpy as np
import requests
import atexit
import os

import mysql.connector
from mysql.connector import Error

images = []
paths = []
encodings = []
names = []

try:
    connection = mysql.connector.connect(
        host='faces.mysql.database.azure.com', # MySQL server host
        database='faces',         # Your database name
        user='waterbottle85',                  # Your username
        password='Killer20045!'               # Your password
    )

    if connection.is_connected():
        db_info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_info)
        cursor = connection.cursor()

        cursor.execute("SELECT ID, ImgUrl, Name FROM faces;") # Replace with your table name
        records = cursor.fetchall()

        for row in records:
            id = row[0]
            image_url = row[1]
            name = row[2]

            response = requests.get(image_url)
            image_data = response.content

            if response.status_code == 200:
                colon_index = name.find(':')
                if colon_index != -1:
                    name = name[colon_index + 2:]

                file_name = name + ".jpg"
                paths.append(file_name)
                with open(file_name, "wb") as file:
                    file.write(response.content)
                    images.append([id, image_url, name])
                print("Image downloaded")
            else: 
                print("Image could not be downloaded")
            


except Error as e:
    print("Error while connecting to MySQL", e)

finally:
    # Close the connection
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")

def cleanup():
    for path in paths:
        if os.path.exists(path):
            os.remove(path)
            print(path, " has been removed")

atexit.register(cleanup)

DeepFace.stream(".")