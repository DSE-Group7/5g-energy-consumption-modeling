from flask import Flask, request, jsonify
from flask_cors import CORS
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.arima.model import ARIMAResults


app = Flask(__name__)
CORS(app)


@app.route('/api/search', methods=['POST'])
def your_endpoint():
    steps = int(request.json['steps'])
    model_fit = ARIMAResults.load('arima_model')
    freaquency_list = model_fit.forecast(steps=steps)
    # print("Forecast: ", asd[0])
    # print("steps", freaquency_list)
    freaquency_list = [{"name": str(index), "Energy": value}
                       for index, value in freaquency_list.items()]

    print("steps", freaquency_list)
    return jsonify(freaquency_list)
#

if __name__ == '__main__':
    app.run(port=3002)
