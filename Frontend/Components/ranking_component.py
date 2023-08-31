from Frontend.Components.input_component import InputComponent

from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st
from Frontend.Components.input_component import InputComponent
import datetime


class RankingComponent:
    def __init__(self):
        self.combined_data = CombinedData()

    def core(self):
        d = st.date_input("When's your birthday", datetime.date(2019, 7, 6))
        st.write('Your birthday is:', d)

    def run(self):
        d = st.date_input("What is the Day", datetime.date(2023, 1, 1),key='ranking_date')
        print(str(d))
        t = st.time_input('What is the Time', datetime.time(9, 00), step=3600,key='ranking_time')
        time = str(d) + ' ' + str(t)
        # st.write('Alarm is set for', t)
        df = self.combined_data.submission_ecdata()
        bsdata = df[df['Time'] == time]
        bsdata.sort_values(by=['Energy'], inplace=True, ascending=False)
        return bsdata[:5]

    def show(self):
        st.title("Highest Energy Consuming Basestations")

        bsdata = self.run()
        # st.line_chart(bsdata, x='Time', y='Energy')
        # st.write(bsdata[])
        st.table(bsdata[['BS', 'Energy']][1:])
