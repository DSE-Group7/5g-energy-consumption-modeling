import os,sys
print(sys.version)
from flask import Flask,



app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to check if a file extension is allowed
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/search', methods=['POST'])
def upload_image():
    received_data = request.json  # Access the incoming JSON data
    # Perform processing or search based on the received data

    # Return a response (for example)
    return jsonify({'result': 'Search successful', 'query': received_data['query']})

if __name__ == '__main__':
    app.run( port=3002)