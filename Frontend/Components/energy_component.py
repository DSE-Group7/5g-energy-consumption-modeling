from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st
from Frontend.Components.input_component import InputComponent


class EnergyComponent:
    def __init__(self, input_component: InputComponent):
        self.input_component = input_component
        self.combined_data = CombinedData()

    def run(self, number):
        df = self.combined_data.submission_ecdata()
        bsdata = df[df['BS'] == str(number)]
        return bsdata

    def compare(self):
        pass

    def show(self):
        st.title("Energy Data")
        bsdata = self.run(self.input_component.get_number())
        st.line_chart(bsdata, x='Time', y='Energy')
