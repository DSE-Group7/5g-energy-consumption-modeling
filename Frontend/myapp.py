import streamlit as st
import pandas as pd

st.title("5G Energy Consumption Modeling")

# st.write("Here's our first attempt at using data to create a table:")

df = pd.read_csv(
    r'OutputFiles\SampleSubmission_25.csv')

ECdata = pd.read_csv(r'Dataset\ECdata.csv')
# st.write(df)

# change the ECdata BS column B_1 to 1
ECdata['BS'] = ECdata['BS'].str.replace('B_', '')

# print(bsdata1.head())
number = st.number_input('Insert Base station Number', value=1,
                         step=1, max_value=1000, min_value=1)
st.write('The current number is ', number)

df[['Time', 'BS']] = df['ID'].str.split('_', expand=True)[[0, 2]]
df['Time'] = pd.to_datetime(df['Time'])
# concatanate the ECdata and df
ECdata['Time'] = pd.to_datetime(ECdata['Time'])
FullData = pd.concat([ECdata, df], axis=0, ignore_index=True)

FullData.sort_values(by=['BS', 'Time'], inplace=True)
FullData.reset_index(drop=True, inplace=True)

bsdata = FullData[FullData['BS'] == str(number)]

# streamlit plot the Time against the Energy
st.line_chart(bsdata, x='Time', y='Energy')
