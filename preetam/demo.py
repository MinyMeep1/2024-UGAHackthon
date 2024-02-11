import face_recognition
import cv2
import numpy as np
import requests
import atexit
import os

import mysql.connector
from mysql.connector import Error

# This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
# other example, but it includes some basic performance tweaks to make things run a lot faster:
#   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
#   2. Only detect faces in every other frame of video.

# PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
# OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
# specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.

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

        counter = 0

        for row in records:
            if "Sydney" in row[2]:
                continue
            if counter > 10:
                break
            counter += 1
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

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

for path in paths:
    name = path.replace(" (GA).jpg", " ")
    names.append(name)
    temp_image = face_recognition.load_image_file(path)
    try:
        encodings.append(face_recognition.face_encodings(temp_image)[0])
        print(name)
    finally:
        continue

# Load a sample picture and learn how to recognize it.
#obama_image = face_recognition.load_image_file("database/obama/obama.jpg")
#obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

# Load a second sample picture and learn how to recognize it.
#biden_image = face_recognition.load_image_file("database/biden/biden.jpg")
#biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

#aleiya_monae_holton_image = face_recognition.load_image_file("database/A'Leiya Mo'Nae Holton.jpg")
#aleiya_monae_holton_face_encoding = face_recognition.face_encodings(aleiya_monae_holton_image)[0]


# Create arrays of known face encodings and their names
known_face_encodings = encodings

known_face_names = names

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Only process every other frame of video to save time
    if process_this_frame:
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]
        
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=.6)
            name = "Unknown"

            # # If a match was found in known_face_encodings, just use the first one.
            # if True in matches:
            #     first_match_index = matches.index(True)
            #     name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                print("WE HAVE A MATCH")

            face_names.append(name)

    process_this_frame = not process_this_frame


    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()