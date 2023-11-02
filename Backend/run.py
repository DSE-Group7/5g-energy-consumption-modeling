from flask import Flask, request, jsonify
from flask_cors import CORS
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.arima.model import ARIMAResults
import pickle
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

data = pd.read_csv("catboost.csv")
column_ranges = data.agg(['min', 'max']).to_dict()

print(column_ranges)


@app.route('/api/forecast', methods=['POST'])
def forecast():
    steps = int(request.json['steps'])
    model_fit = ARIMAResults.load('arima_model')
    freaquency_list = model_fit.forecast(steps=steps)

    freaquency_list = [{"name": str(index), "Energy": value}
                       for index, value in freaquency_list.items()]

    return jsonify(freaquency_list)


@app.route('/api/predict_energy', methods=['POST'])
def predict_energy():
    # Saving model to pickle file
    with open("catboost.pkl", "rb") as file:
        model = pickle.load(file)
    input_data = request.json['features']
    input_list = [[i for i in input_data.values()]]
    # Passing in variables for prediction
    prediction = model.predict(input_list)
    print("The result is", prediction[0])  # Printing result
    return jsonify(prediction[0])


@app.route('/api/random_fill', methods=['GET'])
def get_random_data():
    random_data = {}
    for column in data.columns:
        if column == 'Energy':
            continue
        min_val = column_ranges[column]['min']
        max_val = column_ranges[column]['max']

        if data[column].dtype == 'int64':
            random_data[column] = random.randint(min_val, max_val)
        else:  # assuming non-integer columns are floats
            random_data[column] = random.uniform(min_val, max_val)

    return jsonify(random_data)


if __name__ == '__main__':
    app.run(port=3002)
