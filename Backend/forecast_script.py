import pandas as pd
import os
import pickle
from prophet import Prophet

def forecast(input):
    # Sample input:
    # input = {'Time': ['01/08/2023 10:00'], 'BS': ['B_0'], 'load': [0.59], 'ESMode1': [0], 'ESMode2': [0], 'ESMode6': [0]}

    df = pd.DataFrame(input)
    df['Time'] = pd.to_datetime(df['Time'], format='%m/%d/%Y %H:%M')

    date_range = pd.date_range(start=df['Time'][0], periods=48, freq='H')
    df_extended = pd.DataFrame(date_range, columns=['Time'])
    for column in df.columns[1:]:
        df_extended[column] = df[column][0]

    # Load the general model
    bs=input['BS'][0]
    save_dir = 'Backend\saved_models'

    model_filename = os.path.join(save_dir, f'model_{bs}.pkl')
            
    if os.path.exists(model_filename):
        with open(model_filename, "rb") as f:
            loaded_model = pickle.load(f)
            print('Specific model used.')
    else:
        # Use the general model if the specific model is not available
        general_model_filename = os.path.join(save_dir, 'general_model.pkl')
        with open(general_model_filename, 'rb') as f:
            general_model = pickle.load(f)

        print(bs)
        print(f'model_{bs}.pkl')
        loaded_model = general_model
        print('General model used.')

    # Create the 'future' DataFrame for prediction
    future = pd.DataFrame({'ds': df_extended['Time']})

    # Add columns to the 'future' DataFrame
    future['load'] = df_extended['load']
    future['ESMode1'] = df_extended['ESMode1']
    future['ESMode2'] = df_extended['ESMode2']
    future['ESMode6'] = df_extended['ESMode6']

    # Use the loaded model to predict values for the new data
    forecast = loaded_model.predict(future)

    df_extended[['Energy', 'Energy_low', 'Energy_high']] = forecast[['yhat', 'yhat_lower', 'yhat_upper']]

    print('Forecast successful.')
    return df_extended

if __name__ == "__main__":
    input = {'Time': ['01/08/2023 10:00'], 'BS': ['B_0'], 'load': [0.59], 'ESMode1': [0], 'ESMode2': [0], 'ESMode6': [0]}
    df = forecast(input)
    print(df.head())