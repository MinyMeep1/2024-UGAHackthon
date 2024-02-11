from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from deepface import DeepFace
import os

app = Flask(__name__)

CORS(app)

# Define the upload folder path
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set the upload folder in the app's configuration
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed extension
ALLOWED_EXTENSIONS = {'jpg', 'jpeg'}

def allowed_file(filename):
    """Check if file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/send_image', methods=['POST'])
def send_image():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400
    file = request.files['file']
    # If user does not select file, browser submits an empty part without filename
    if file.filename == '':
        return jsonify(message="No selected file"), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(save_path)
        file.save(save_path)
        image_paths = []
        for filename in os.listdir("base-models"):
            full_path = os.path.join("base-models", filename)
            image_paths.append(full_path)

        found = False
        person_name = ""
        for path in image_paths:
            result = DeepFace.verify(save_path, path)
            if (result["verified"]):
                person_name = os.path.basename(path).split('.')[0]
                found = True
                break

        print(save_path)
        os.remove(save_path)
        if found:
            return jsonify(message=f"The person is: {person_name}"), 200
                    
        return jsonify(message=f"The person could not be found"), 200
    else:
        return jsonify(message="Allowed file types are jpg, jpeg"), 400


if __name__ == '__main__':
    app.run(debug=True)

