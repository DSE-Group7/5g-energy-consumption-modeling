from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st
from Frontend.Components.input_component import InputComponent


class AlertComponent:
    def __init__(self):
        self.preprcoessor = DataPreprocessor()
        self.df = self.preprcoessor.alert_preprocessor()

    def run(self):
        d = st.date_input("What is the Day", datetime.date(2023, 1, 1))
        print(str(d))
        t = st.time_input('What is the Time', datetime.time(9, 00))
        time = str(d) + ' ' + str(t)
        # st.write('Alarm is set for', t)
        df = self.combined_data.submission_ecdata()
        bsdata = df[df['Time'] == time]
        bsdata.sort_values(by=['Energy'], inplace=True, ascending=True)
        return bsdata[:5]

    def show(self):
        st.title("Alerts")
        bsdata = self.run()
        st.table(bsdata[['BS', 'Energy']][1:])