from flask import Flask,request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/search', methods=['POST'])
def your_endpoint():
    # steps = request.json['steps']
    # print(steps)
    return "hi"

if __name__ == '__main__':
    app.run(port=3002)
