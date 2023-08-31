import streamlit as st
import pandas as pd
import Frontend.data_preprocessor as dp
from Frontend.Components.input_component import InputComponent
from Backend.forecast_script import forecast
from datetime import datetime as dt
import datetime
# input = {'Time': ['01/08/2023 10:00'], 'BS': ['B_0'], 'load': [0.59], 'ESMode1': [0], 'ESMode2': [0], 'ESMode6': [0]}


class ForecastComponent:
    def __init__(self):
        pass

    def run(self):

        d = st.date_input("What is the Day", datetime.date(
            2023, 1, 1), key='forecast_date')
        print(str(d))
        t = st.time_input('What is the Time', datetime.time(
            9, 00), step=3600, key='forecast_time')
        time = str(d) + ' ' + str(t)
        # st.write('Alarm is set for', t)

        self.base_station_number = st.number_input('Insert Base station Number', value=1,
                                                   step=1, max_value=1000, min_value=1, key='forecast_bs')
        self.load_value = st.number_input('Insert Load', value=0.00,
                                          step=0.01, max_value=1.00, min_value=0.00, key='forecast_load')
        self.es1 = st.number_input('Insert ES-Mode 1 value', value=0.00,
                                   step=0.01, max_value=1.00, min_value=0.00, key='forecast_es1')
        self.es2 = st.number_input('Insert ES-Mode 2 value', value=0.00,
                                   step=0.01, max_value=1.00, min_value=0.00, key='forecast_es2')
        self.es6 = st.number_input('Insert ES-Mode 6 value', value=0.00,
                                   step=0.01, max_value=1.00, min_value=0.00, key='forecast_es6')

        format_string = "%Y-%m-%d %H:%M:%S"

        parsed_datetime = dt.strptime(time, format_string)

        df = forecast({
            'Time': [parsed_datetime],
            'BS': ['B_' + str(self.base_station_number)],
            'load': [self.load_value],
            'ESMode1': [self.es1],
            'ESMode2': [self.es2],
            'ESMode6': [self.es6]
        })
        return df

    def show(self):
        st.title("Energy Data")
        bsdata = self.run()
        st.line_chart(bsdata, x='Time', y='Energy')
