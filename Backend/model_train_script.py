# %%
import pandas as pd
import os
import pickle
from prophet import Prophet

def train_models():
    # %%
    # Load and preprocess your data
    base = pd.read_csv(r'..\Dataset\BSinfo.csv')
    cell = pd.read_csv(r'..\Dataset\CLdata.csv')
    energy = pd.read_csv(r'..\Dataset\ECdata.csv')

    cell.drop(['CellName'], axis=1, inplace=True)
    CLdata_grouped = cell.groupby(['BS', 'Time']).sum().reset_index()
    base_cell_energy = pd.merge(CLdata_grouped, energy, on=('Time','BS'), how='inner')

    base_cell_energy['BS'] = base_cell_energy['BS'].str.replace('B_', '')
    base_cell_energy['Time'] = pd.to_datetime(base_cell_energy['Time'], format='%m/%d/%Y %H:%M')

    # Get unique base station values from the dataset
    unique_base_stations = base_cell_energy['BS'].unique()

    # Create a directory to save models
    save_dir = 'saved_models'
    os.makedirs(save_dir, exist_ok=True)

    data = base_cell_energy.copy()
    # Resample the data and fill missing values
    data.set_index('Time', inplace=True)
    data.drop(['BS'], axis=1, inplace=True)
    data_resampled = data.resample('H').mean()
    data_resampled['Energy'].fillna(method='ffill', inplace=True)

    # Rename columns for Prophet
    data_resampled.rename(columns={'Energy': 'y'}, inplace=True)
    data_resampled.reset_index(inplace=True)
    data_resampled.rename(columns={'Time': 'ds'}, inplace=True)

    print('Initiating training...')

    # Create and fit the general Prophet model
    general_model = Prophet()
    general_model.add_regressor('load')
    general_model.add_regressor('ESMode1')
    general_model.add_regressor('ESMode2')
    general_model.add_regressor('ESMode6')
    general_model.fit(data_resampled)

    # Save the general model to a file in the 'saved_models' folder
    general_model_filename = os.path.join(save_dir, 'general_model.pkl')
    with open(general_model_filename, 'wb') as f:
        pickle.dump(general_model, f)


    # Train and save separate models for each base station
    for bs in unique_base_stations:
        # Filter data for a specific base station
        bs_data = base_cell_energy[base_cell_energy['BS'] == bs]

        # Skip base stations with insufficient data
        if bs_data.shape[0] < 2:
            print(f"Skipping Base Station {bs} due to insufficient data")
            continue

        # Resample the data and fill missing values (rest of the preprocessing steps)
        bs_data.set_index('Time', inplace=True)
        bs_data = bs_data.drop(['BS'], axis=1)
        bs_data_resampled = bs_data.resample('H').mean()
        bs_data_resampled['Energy'].fillna(method='ffill', inplace=True)
        bs_data_resampled.rename(columns={'Energy': 'y'}, inplace=True)
        bs_data_resampled.reset_index(inplace=True)
        bs_data_resampled.rename(columns={'Time': 'ds'}, inplace=True)

        # Fill missing values in the 'load' column with the mode
        mode_load = bs_data_resampled['load'].mode()[0]  # Get the first mode if there are multiple
        # bs_data_resampled['load'].fillna(mode_load, inplace=True)
        bs_data_resampled['load'].fillna(method='ffill', inplace=True)
        # change this to ffill

        # Fill missing values in the 'ESMode1' column with the mean
        mean_ES1 = bs_data_resampled['ESMode1'].mean()
        bs_data_resampled['ESMode1'].fillna(mean_ES1, inplace=True)

        # Fill missing values in the 'ESMode2' column with the mean
        mean_ES2 = bs_data_resampled['ESMode2'].mean()
        bs_data_resampled['ESMode2'].fillna(mean_ES2, inplace=True)

        # Fill missing values in the 'ESMode6' column with the mean
        mean_ES6 = bs_data_resampled['ESMode6'].mean()
        bs_data_resampled['ESMode6'].fillna(mean_ES6, inplace=True)

        # Create and fit the Prophet model
        model = Prophet()
        model.add_regressor('load')
        model.add_regressor('ESMode1')
        model.add_regressor('ESMode2')
        model.add_regressor('ESMode6')
        model.fit(bs_data_resampled)

        # Save the model to a file in the 'saved_models' folder
        model_filename = os.path.join(save_dir, f'model_B_{bs}.pkl')
        with open(model_filename, 'wb') as f:
            pickle.dump(model, f)
        
    print('Models trained and saved successfully!')

if __name__ == "__main__":
    print('Training models...')
    train_models()
    print('Models trained and saved successfully!')