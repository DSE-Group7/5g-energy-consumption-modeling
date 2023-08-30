from Frontend.data_preprocessor import DataPreprocessor, CombinedData
import streamlit as st


class InputComponent:
    def __init__(self):
        self.number = 1

    def run(self):
        self.number = st.number_input('Insert Base station Number', value=1,
                                      step=1, max_value=1000, min_value=1)

    def get_number(self):
        return self.number

    def show(self):
        st.title("Load Data")
        self.run()
        st.write('The current number is ', self.number)
