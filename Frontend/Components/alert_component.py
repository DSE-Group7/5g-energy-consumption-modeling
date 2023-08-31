from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st
from Frontend.Components.input_component import InputComponent
import datetime


class AlertComponent:
    def __init__(self):
        self.preprcoessor = DataPreprocessor()
        self.df = self.preprcoessor.alert_preprocessor()

    def run(self):
        d = st.date_input("What is the Day", datetime.date(
            2023, 1, 1), key='alert_date')
        print(str(d))
        t = st.time_input('What is the Time', datetime.time(
            9, 00), step=3600, key='alert_time')
        time = str(d) + ' ' + str(t)
        # st.write('Alarm is set for', t)

        self.base_station_number = st.number_input('Insert Base station Number', value=1,
                                                   step=1, max_value=1000, min_value=1, key='alert_bs')
        self.energy_value = st.number_input('Insert Energy Number', value=1,
                                            step=1, max_value=1000, min_value=1, key='alert_energy')
        bsdata = self.df[(self.df['BS'] == str(
            self.base_station_number)) & (self.df['Time'] == time)]
        # bsdata.sort_values(by=['Energy'], inplace=True, ascending=True)

        return bsdata

    def show(self):
        st.title("Alerts")
        bsdata = self.run()
        st.write(bsdata)
        # print(df)
        # bsdata = self.run()
        if bsdata['Min'].iloc[0] > self.energy_value:
            st.write("Alert Energy is too low")
        elif bsdata['Max'].iloc[0] < self.energy_value:
            st.write("Alert Energy is too high")

        # st.table(bsdata[['BS', 'Energy']][1:])
