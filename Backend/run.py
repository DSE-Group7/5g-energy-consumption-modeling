from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/search', methods=['OPTIONS', 'POST'])
def your_endpoint():
    # Your endpoint logic here
    # Ensure to include the 'Access-Control-Allow-Origin' header in the response
    # response = make_response("Your response")
    # # response.headers.add("Access-Control-Allow-Origin", "https://didactic-funicular-65r46xgqvv6cg46-3000.preview.app.github.dev")
    # response.headers.add("Access-Control-Allow-Origin", "*")

    # return response
    return "hi"

if __name__ == '__main__':
    app.run(port=3002)
