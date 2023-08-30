from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st
from Frontend.Components.input_component import InputComponent


class InfoComponent:
    def __init__(self, input_component: InputComponent):
        self.input_component = input_component
        self.combined_data = CombinedData()
        self.preprcoessor = DataPreprocessor()

    def run(self, number):
        df = self.preprcoessor.bsinfo_preprocessor()
        bsdata = df[df['BS'] == str(number)]
        return bsdata

    def compare(self):
        pass

    def show(self):
        bsdata = self.run(self.input_component.get_number())
        celldata = bsdata[bsdata['Cell Name'] == str('Cell0')]
        col1, col2, col3 = st.columns(3)
        col1.metric("Freaquency", celldata['Frequency'].values[0])
        col2.metric("Bandwidth", celldata['Bandwidth'].values[0])
        col3.metric("TXPower", celldata['TXPower'].values[0])
