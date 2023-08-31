# %%
import pandas as pd
import os
import pickle
from prophet import Prophet

def make_submission(submission_num):

    print('Initiating submission...')
    # %%
    # Load the new dataset
    base = pd.read_csv(r'..\Dataset\BSinfo.csv')
    cell = pd.read_csv(r'..\Dataset\CLdata.csv')
    energy = pd.read_csv(r'..\Dataset\ECdata.csv')
    submit = pd.read_csv(r'..\Dataset\SampleSubmission.csv')

    CLdata_grouped = cell.groupby(['BS', 'Time']).sum().reset_index()

    submit['Time'] = pd.to_datetime(submit['Time'], format='%Y-%m-%d %H:%M:%S')
    CLdata_grouped['Time'] = pd.to_datetime(CLdata_grouped['Time'], format='%m/%d/%Y %H:%M')

    cell_submit = pd.merge(CLdata_grouped, submit, on=('Time','BS'), how='inner')

    cell_submit['Energy'] = 0
    cell_submit= cell_submit[['Time', 'BS', 'Energy', 'load','ESMode1','ESMode2','ESMode6']]
    cell_submit['Time'] = pd.to_datetime(cell_submit['Time'])
    unique_base_stations_submit = cell_submit['BS'].unique()
    print(unique_base_stations_submit)

    # Load the general model
    save_dir = 'saved_models'
    general_model_filename = os.path.join(save_dir, 'general_model.pkl')
    with open(general_model_filename, 'rb') as f:
        general_model = pickle.load(f)

    for bs in unique_base_stations_submit:
        # Load the corresponding Prophet model if available, otherwise use the general model
        model_filename = os.path.join(save_dir, f'model_{bs}.pkl')
        
        if os.path.exists(model_filename):
            with open(model_filename, "rb") as f:
                loaded_model = pickle.load(f)
                print('Specific model used.')
        else:
            print(bs)
            print(f'model_{bs}.pkl')
            # Use the general model if the specific model is not available
            loaded_model = general_model
            print('General model used.')
        
        # Filter new data for the specific base station
        bs_data_submit = cell_submit[cell_submit['BS'] == bs]

        # Create the 'future' DataFrame for prediction
        future = pd.DataFrame({'ds': bs_data_submit['Time']})
        
        # Add columns to the 'future' DataFrame
        future['load'] = bs_data_submit['load']
        future['ESMode1'] = bs_data_submit['ESMode1']
        future['ESMode2'] = bs_data_submit['ESMode2']
        future['ESMode6'] = bs_data_submit['ESMode6']

        # Use the loaded model to predict values for the new data
        forecast = loaded_model.predict(future)

        # Update the 'Energy' column in the submit DataFrame with predictions
        submit.loc[submit['BS'] == bs, 'Energy'] = forecast['yhat'].values

    submit['Time'] = pd.to_datetime(submit['Time'])

    # Create the 'ID' column by joining 'Time' and 'BS' columns
    submit['ID'] = submit['Time'].astype(str) + '_' + submit['BS']

    # Remove unnecessary columns and reorder columns
    submit = submit[['ID', 'Energy']]

    # Create a directory to save submissions
    submission_dir = 'submissions'
    os.makedirs(submission_dir, exist_ok=True)
    submission_filename = os.path.join(submission_dir, f'SampleSubmission_{submission_num}.csv')
   
    # Save the submission file
    submit.to_csv(submission_filename, index=False)
    # print(submit.shape)
    # submit

    print('Sumbission CSV saved successfully!')

if __name__ == "__main__":
    print('Making predictions...')
    make_submission('07')
    print('Sumbission CSV saved successfully!')