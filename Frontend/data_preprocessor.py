import pandas as pd
import numpy as np


class DataPreprocessor:
    def __init__(self):
        pass

    def submission_preprocessor(self):
        df = pd.read_csv(
            r'OutputFiles\SampleSubmission_25.csv')
        df[['Time', 'BS']] = df['ID'].str.split('_', expand=True)[[0, 2]]
        df['Time'] = pd.to_datetime(df['Time'])
        return df

    def ecdata_preprocessor(self):
        ECdata = pd.read_csv(r'Dataset\ECdata.csv')
        ECdata['BS'] = ECdata['BS'].str.replace('B_', '')
        ECdata['Time'] = pd.to_datetime(ECdata['Time'])

        return ECdata

    def cldata_preprocessor(self):
        CLdata = pd.read_csv(r'Dataset\CLdata.csv')
        CLdata['BS'] = CLdata['BS'].str.replace('B_', '')
        CLdata['Time'] = pd.to_datetime(CLdata['Time'])

        return CLdata

    def bsinfo_preprocessor(self):
        BSinfo = pd.read_csv(r'Dataset\BSinfo.csv')
        BSinfo['BS'] = BSinfo['BS'].str.replace('B_', '')
        return BSinfo


class CombinedData:

    def __init__(self):
        pass

    def submission_ecdata(self):
        submission_df = DataPreprocessor().submission_preprocessor()
        ecdata_df = DataPreprocessor().ecdata_preprocessor()

        FullData = pd.concat([ecdata_df, submission_df],
                             axis=0, ignore_index=True)
        FullData.sort_values(by=['BS', 'Time'], inplace=True)
        FullData.reset_index(drop=True, inplace=True)

        return FullData
