import streamlit as st
import pandas as pd
import Frontend.data_preprocessor as dp
from Frontend.Components.input_component import InputComponent

class LoadComponent:
    def __init__(self, input_component:InputComponent):
        
        self.input_component = input_component
        self.preprocessor = dp.DataPreprocessor()
        self.data = self.preprocessor.cldata_preprocessor()

    def run(self, number):
        bsdata = self.data[self.data['BS'] == str(number)]
        return bsdata

    def compare(self):
        pass

    def show(self):
        st.title("Load Data")
        bsdata = self.run(self.input_component.get_number())
        st.line_chart(bsdata, x='Time', y='load')
